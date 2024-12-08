import User from '../model/user.js';  
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';  

// Register User
export const registerUser = async (req, res) => {
    try {
        const { username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword,
            // profile:{
            //     profilePhoto:cloudResponse.secure_url,
            // }
        });

        return res.status(201).json({ message: "Account created successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        }).status(200).json({ message: `Welcome back ${user.fullname}`, user, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Logout User
export const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({ message: 'Logout successful', success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Server error. Please try again later.', success: false, error: error.message });
    }
};

