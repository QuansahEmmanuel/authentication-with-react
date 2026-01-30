import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // Note: This requires an existing index in MongoDB
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// CRITICAL: Check if the model already exists before creating it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
