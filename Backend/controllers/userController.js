import User from '../model/user.js';  
import bcrypt from "bcrypt";  
import jwt from 'jsonwebtoken';  

// Register User
export const registerUser = async (req, res) => {
    try {
        const { username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const existingUser = await User.findOne({ fullname:username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken, Try with a different username', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname:username, password: hashedPassword, pfp:"."});

        await newUser.save();

        return res.status(201).json({ message: "Account created successfully", success: true });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const user = await User.findOne({ fullname:username });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect username or password, try again', success: false });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        }).status(200).json(
            { 
                message: `Welcome back ${user.fullname}`, 
                userDetails: {
                    userId : user._id,
                    username : user.fullname,
                    pfp : user.pfp,
                    joined: user.createdAt,
                }, 
                success: true }
        );

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

// Update Password User
export const changepassword = async (req, res) => {
    try {
        const { userName, oldPassword, newPassword } = req.body;

        if (!userName || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const user = await User.findOne({ fullname: userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password, try again', success: false });
        } 
        // hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({fullname:userName}, {password:hashedPassword});

        res.status(200).json(
            { 
                message: `Password has been updated!`, 
                userDetails: {
                    username : user.fullname,
                    pfp : user.pfp,
                    joined: user.createdAt,
                }, 
                success: true }
        );

    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};
export const updateprofile = async (req, res) => {
    try {
        const { newUserName, pfp } = req.body;
        const oldUserDetails = JSON.parse(req.body.oldUserDetails);
        
        if (!oldUserDetails || !newUserName || !pfp) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }


        const user = await User.findOne({ fullname: oldUserDetails.username });
        if (!user){
            return res.status(404).json({ message: 'User not found', success: false });
        }
        // important security check that person whose details to be updated is the same as the person requesting the update!
        else if (req.userId != user._id) {
            return res.status(404).json({ message: 'Hehe oversmart huh?', success: false });
        }
        // user ka purana name is not equal to new username => he has changed username and also there already exists a user with his newusername
        else if (newUserName != oldUserDetails.username && await User.findOne({ fullname : newUserName })){
            return res.status(404).json({ message: 'This username is already taken!', success: false });
        }
        else {
            await User.findOneAndUpdate({fullname : oldUserDetails.username}, {fullname: newUserName, pfp: pfp});
            res.status(200).json(
                { 
                    message: `Profile has been updated!`, 
                    userDetails: {
                        username : newUserName,
                        pfp : pfp,
                        joined: user.createdAt,
                    }, 
                    success: true }
            );
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};


