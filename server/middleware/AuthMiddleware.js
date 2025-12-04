import jwt from 'jsonwebtoken'
import User from '../models/User.js';


export const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ seccess: false, message: 'Not Authorized' })
    }

    try {
        const userId = jwt.decode(token, process.env.SECRET_KEY)
        if (!userId) {
            return res.json({ success: false, message: "Not Authorized" })
        }
        req.user = await User.findById(userId).select('-password')
        next()
    } catch (error) {
        console.error("Auth error:", error.message);
        console.log("JWT verification error:", error);
        return res.json({ success: false, message: "Not authorized" });

    }
}

