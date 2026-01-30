import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConnection";
import User from "@/moddel/userModel";

export async function POST(req) {
    try {
        await dbConnect();
        const { fullName, email, phone, password } = await req.json();

        if (!fullName || !email || !phone || !password) {
            return NextResponse.json({ message: "Please fill in all fields" }, { status: 400 });
        }

        if (password.length < 4) {
            return NextResponse.json({ message: "Password must be at least 4 characters long" }, { status: 400 });
        }

        if (!email.endsWith("@code.com")) {
            return NextResponse.json({ message: "Email must end with @code.com" }, { status: 400 });
        }

        if (!phone.match(/^[0-9]{10}$/)) {
            return NextResponse.json({ message: "Please enter a valid 10-digit phone number" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already email exists" }, { status: 400 });
        }

        // 1. Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Create user
        const user = {
            fullName,
            email,
            phone,
            password: hashedPassword,
        };

        // 3. Save user to database
        const newUser = await User.create(user);

        if (!newUser) {
            return NextResponse.json({ message: "User not created" }, { status: 400 });
        }


        // 4. Return response
        return NextResponse.json({ message: "Registration successful" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}



