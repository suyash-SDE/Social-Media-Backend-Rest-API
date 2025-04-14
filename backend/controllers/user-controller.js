
import User from "../model/User.js";
import bcrypt from "bcryptjs";

// Get All Users
export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Signup (Register User)
export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please login instead." });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        return res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        console.error("Error in signup:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Login (Login User)

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "Couldn't find user by this email" });
        }

        // Compare passwords
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        return res.status(200).json({ message: "Login Successfully" });
    } catch (err) {  // Fixed variable name (was `error`, but logged `err`)
        console.error("Error in login:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
