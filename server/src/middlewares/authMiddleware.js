const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

async function authMiddleware(req, res , next){
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];

    try{
        if(!token){
            return res.status(400).json({message : "Token not found" , success : false})
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select("-password")

        if(!user){
            return res.status(400).json({message : "User not found" , success : false})
        }

        req.user = user
        next()

    }catch(err){
        console.error("Auth Error:", err);
        return res.status(401).json({ message: "Authentication failed", success: false });
    }
}

module.exports = authMiddleware