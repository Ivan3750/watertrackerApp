import { connectMongo } from '../../../lib/mongodb';
import User from "../db.js";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || "water";

export async function POST(req) {
  await connectMongo();
  try {
    const {username, email } = await req.json();
    if (!username || !email || !password || !chatId) {
      return NextResponse.json({ message: `Username, email are required, ${chatId}` }, { status: 400 });
    }


    const token = jwt.sign(
      { username, email },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error("Error during user creation:", err);
    return NextResponse.json({ message: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
