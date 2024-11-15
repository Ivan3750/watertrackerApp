import { connectMongo } from "@/app/lib/mongodb.js"
import User from "@/app/api/auth/db"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

export async function GET(req) {
    await connectMongo()

    const { searchParams } = new URL(req.url)
    const userID = searchParams.get("id")

    if (!userID) {
        return NextResponse.json({ message: "User  ID is required" }, { status: 400 })
    }

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return NextResponse.json({ message: "Invalid User ID format" }, { status: 400 })
    }

    try {
        const user = await User.findOne({ _id: userID })

        if (!user) {
            return NextResponse.json({ message: "User  not found" }, { status: 404 })
        }

        const { password, ...userData } = user.toObject()
        return NextResponse.json(userData, { status: 200 })
    } catch (error) {
        console.error("Error fetching user:", error)
        return NextResponse.json({ message: "Error fetching user", error: error.message }, { status: 500 })
    }
}