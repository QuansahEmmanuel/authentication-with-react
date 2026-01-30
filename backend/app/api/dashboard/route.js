import { NextResponse } from "next/server";
import { verifyToken } from "@/config/session";
import User from "@/moddel/userModel";
import connectDB from "@/config/dbConnection";

export async function GET(request) {
    await connectDB();
    const token = request.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const user = await User.findById(decodedToken.id).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Dashboard", user });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}