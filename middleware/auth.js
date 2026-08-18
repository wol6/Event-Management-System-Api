import jwt from "jsonwebtoken";
import UserModel from "../schema/user.js";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.token

    try {
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }

        jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' })
            }
            req.user = user
            next()
        }
        )

    } catch (err) {
        console.log(err)
    }
};

export const adminAccess = async (req, res, next) => {
    const userid = req.user.id

    const user = await UserModel.findById(userid).lean()

    if (!user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Access is Denied' })

    }
    next()
}