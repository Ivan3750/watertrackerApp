import { connectMongo } from '../../../lib/mongodb';
import User from "../db.js";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || "water";

export async function POST(req) {
  await connectMongo();  
  try {
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return NextResponse.json({ message: "Username, email, and password are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return NextResponse.json({ message: "Username or email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { username: newUser.username, email: newUser.email },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
