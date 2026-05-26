import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const userSignUp = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({
              message: "input fields are required",
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
          return res.status(409).json({
            message: "User already exists with this email",
          }); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        })

        await newUser.save();


        res.status(201).json({
            message: "User Registered successfully",
            email: newUser.email
        })

    }catch (error) {
        console.log("Resgisteration failed");
        return res.status(500).json({
          message: "Server error",
        });
    }
}


export const userSignIn = async (req, res) => {
    try {
        const {email, password} = req.body;
          if (!email || !password) {
            return res.status(400).json({
              message: "input fields are required",
            });
          }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        // jwt sign
        const token =  jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"})


        return res.status(200).json({
            message: "User logged in successfully",
            email,
            token
        })

    } catch (error) {
          return res.status(500).json({
            message: "Server error",
          });
    }

}

export const userProfile = (req, res) => {
    res.json({
        message: "Welcome user",
        user: req.user._id,
    })

}