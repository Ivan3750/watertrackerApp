import { connectMongo } from '../../../lib/mongodb';
import User from "../db.js";
import { NextResponse } from 'next/server';
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "water"
export async function POST(req) {
  await connectMongo();  // Ensure DB is connected




  const { email, password } = req.json();
  try {
    const user = await User.findOne({ email }).select("password email username");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json.json({ message: "Invalid credentials" }, {status: 401});
    }

    const token = jwt.sign({ username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '7d' });
    return NextResponse.json({ token }, {status: 201});
  } catch (err) {
    return NextResponse.json({ message: err.message }, {status: 500});
  }
   
}

