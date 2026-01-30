import { NextResponse } from "next/server";
import { verifyToken } from "@/config/session";
import User from "@/moddel/userModel";

export async function GET(req) {
    try {
        const cookie = req.cookies.get("token");

        if (!cookie || !cookie.value) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Use .value to get the actual JWT string
        const decodedToken = verifyToken(cookie.value);

        const user = await User.findById(decodedToken.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User found", user: user._id }, { status: 200 });
    } catch (error) {
        // Detailed error for debugging; consider a generic message for production
        return NextResponse.json({
            message: "Internal server error",
            error: error.message || error
        }, { status: 500 });
    }
}
