import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnection";
import User from "@/moddel/userModel";

import { generateToken } from "@/config/session";


export async function POST(req) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        if (!email.endsWith("@code.com")) {
            return NextResponse.json({ message: "Email must end with @code.com" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token = generateToken(existingUser._id);

        const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}