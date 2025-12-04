import bcrypt from 'bcrypt'
import User from '../models/User.js';
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "7d" });
}

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        if (!name || !email || !password || !role || password.length < 8) {
            return res.json({ success: false, message: "Fill all the fields" })
        }

        const userExits = await User.findOne({ email })
        if (userExits) {
            return res.json({ success: false, message: "User already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role })
        const token = generateToken(user._id.toString())

        res.cookie("token", token, {
            httponly: true,
            secure: false,
             sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    try {
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        const token = generateToken(user._id.toString())

        res.cookie("token", token, {
            httponly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



export const getUserData = async (req, res) => {
    try {
        const { user } = req.body;
        res.json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}