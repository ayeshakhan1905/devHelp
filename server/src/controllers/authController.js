const { validationResult } = require("express-validator")
const userModel = require("../models/userModel")
const generateToken = require("../utils/generateToken")

const registerController = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {userName , email , password ,role} = req.body
        if(!userName || !email || !password || !role){
            return res.status(400).send("Required fields missing!!!")
        }
        
        let user = await userModel.findOne({email})
        if(user){
            return res.status(400).send("User already exist. Plz login")
        }
        user = await userModel.create({
            userName , email, password , role
        })

        const token = generateToken(user._id);
        res.cookie("token", token ,{
            httpOnly : true,
            sameSite : "none",
            secure : true
        })

        res.status(200).json({
            message : "User created suceessfully",
            success : true,
            user
        })
    }catch(err){
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
} 
const loginController = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {email , password} = req.body
        if(!email || !password){
            return res.status(400).send("Required fields missing :(")
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).send("Invalid credentials")
        }
        await user.comparePassword(password)
        const token = generateToken(user.id)
        res.cookie("token" , token , {
            httpOnly : true,
            sameSite : "none",
            secure : true
        })

        res.status(200).json({
            message : "User logged in sucessfully",
            success : true,
            user
        })

    }catch(err){
        res.status(500).json({ message: err.message });
    }
} 
const logoutController = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        res.clearCookie("token",{
            httpOnly : true,
            sameSite : "none",
            secure : true
        })

        res.status(200).json({
            message : "User logged out suceessfully",
            success : true
        })
    }catch(err){
        res.status(500).json({ message: err.message });
    }
} 

const getMe = async (req, res) => {
    console.log("/me route hit");
    // console.log(req.user);
    res.status(200).json({
    user: req.user
  });
};

module.exports = {
    registerController,
    loginController,
    logoutController,
    getMe
};