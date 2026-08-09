import { sendVerifyEmail } from "../../config/email.js"
import UserModel from "../../schema/user.js"



export const adminApproval = async (req, res) => {
    try {

        const { email } = req.params

        const isEmailExists = await UserModel.findOne({ email }).lean()
        if (!isEmailExists) return res.end(`Email : ${email} is not found`)

        await UserModel.updateOne({ email }, { $set: { isAdmin: true } })

        return res.end(`Email : ${email} is approved as admin`)
    } catch (e) {
        console.log(e)
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email)
        const isEmailExists = await UserModel.findOne({ email }).lean()
        if (!isEmailExists) return res.end(`Email : ${email} is not found`)

        await UserModel.updateOne({ email }, { $set: { verifyEmail: true } })

        return res.end(`Email : ${email} is verified`)
    } catch (e) {
        console.log(e)
    }
}