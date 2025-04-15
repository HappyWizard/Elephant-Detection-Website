import User from '../models/user.model.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
const JWT_SECRET = "qwedfghjuytrewqazxcvbnmkopoiuygjhgfdsxcvbn" // can be any gliberrish


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if(!user){
        return res.json({ error: "User Not Found" })
    }
    if (await bcrypt.compare(password, user.password)){
        const token = jwt.sign({}, JWT_SECRET, {
            expiresIn: '120m',
        })

        if (res.status(201)){

            return res.json({ status: "ok", data: token})
        }else{
            return res.json({ error: "error"})
        }
    }
    res.json({ status: "error", error: "Password Incorrect"})
}

export const signupUser = async (req, res) => {

    const { userName, email, password } = req.body;

    const encrptedPassword = await bcrypt.hash(password, 10)
    try{
        const oldUser = await User.findOne({email})

        if(oldUser){
            return res.send({error: "User Already Exists"})
        }
        await User.create({
            userName: userName,
            email: email,
            password: encrptedPassword,
        })

        res.send({status:"ok", data:{userName, email, password}})

    }catch(error){
        res.send({status: "error"})
    }
}


