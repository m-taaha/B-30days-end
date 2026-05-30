import { users } from "../userData/userData.js";
import jwt from "jsonwebtoken"

export const signIn = (req, res) => {
    try {
        // const {email} = users.email;

        const user = users.find(u => u.email === req.body.email);

        if(!user) {
            return res.status(400).json({
                message: "NO user found"
            })
        }

         const secret = "mysecretkey";
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(payload, secret);



        return res.status(200).json({
            message: "Login successfull",
            user: user.email,
            role: user.role, 
            token

        })

        

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const getMe = (req, res) => {
    return res.status(200).json({
        message: "Welcome user",
        user: req.user
    })
}

export const getAdmin = (req, res) => {
    return res.status(200).json({
        message: "Welcome admin",
        user: req.user
    })
}