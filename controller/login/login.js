import UserModel from "../../schema/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendAdminEmail, sendVerifyEmail } from "../../config/email.js"

export const signUp = async (req, res) => {
    try {
        console.log('sign up')
        const { name, email, password, isAdmin } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        await UserModel.create({
            name,
            email,
            password: hashedPassword,
            // isAdmin: isAdmin || false, 
        })

        sendVerifyEmail(name, email)

        // if is admin call function to send mail 
        if (isAdmin) {
            sendAdminEmail(name, email)
        }

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully"
        })
    } catch (err) {
        console.log(err)
    }
}

export const signIn = async (req, res) => {
    try {
        console.log('logging in...')
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        if (!user.verifyEmail) {
            return res.status(400).json({ message: "Email not verified" })

        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRETKEY,
            { expiresIn: "1h" }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        })
    } catch (err) {
        console.log(err)
    }
}

export const logout = (req, res) => {

    res.clearCookie("token")

    res.json({
        success: true,
        message: "Logged out"
    })

}