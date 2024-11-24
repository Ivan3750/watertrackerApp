import { connectMongo } from "@/app/lib/mongodb.js"
import User from "@/app/api/auth/db"
import { NextResponse } from "next/server"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken';


const secretKey = 'water'; 

export async function GET(req) {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: "Authorization header missing or invalid" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findOne({ email: decoded.email });

       /*  if (!user) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        } */

       /*  if (!mongoose.Types.ObjectId.isValid(user.email)) {
            return NextResponse.json({ message: "Invalid User Data format" }, { status: 400 });
        } */


        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const { password, ...userData } = user.toObject();
        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json({ message: `Invalid token` }, { status: 401 });
        }

        if (error.name === 'TokenExpiredError') {
            return NextResponse.json({ message: "Token expired" }, { status: 401 });
        }

        console.error("Error fetching user:", error);
        return NextResponse.json({ message: `Error fetching user ${token}`, error: error.message }, { status: 500 });
    }
}
export async function PATCH(req) {
    await connectMongo();

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: "Authorization header missing or invalid" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const body = await req.json(); // Отримання нових даних із тіла запиту

        // Оновлення даних
        Object.keys(body).forEach(key => {
            if (user[key] !== undefined) {
                user[key] = body[key];
            }
        });

        await user.save(); // Збереження оновленого користувача

        const { password, ...updatedUserData } = user.toObject();
        return NextResponse.json(updatedUserData, { status: 200 });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        if (error.name === 'TokenExpiredError') {
            return NextResponse.json({ message: "Token expired" }, { status: 401 });
        }

        console.error("Error updating user:", error);
        return NextResponse.json({ message: `Error updating user`, error: error.message }, { status: 500 });
    }
}