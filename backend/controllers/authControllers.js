import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/usermodel.js";


export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: "exist", message: "User already exists" });
        }

        const minLength = 8;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumber = /[0-9]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (
            password.length < minLength ||
            !hasUpperCase.test(password) ||
            !hasLowerCase.test(password) ||
            !hasNumber.test(password) ||
            !hasSpecialChar.test(password)
        ) {
            return res.status(400).json({
                status: "passwordconstraints",
                message: "Password does not meet requirements\n\n password must be\n 8 characters long\n atleast 1 uppercase\n atleast 1 lowercase, atleast 1 number\n atleast 1 special character"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            name
        });

        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            userId: newUser._id
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                status: "notexist",
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({
                status: "wrongpassword",
                message: "Incorrect password"
            });
        }

        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            status: "success",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};