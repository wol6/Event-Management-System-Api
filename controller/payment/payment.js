import crypto from 'crypto'
import razorpay from "../../config/razorpay.js"
import RegEvent from '../../schema/registrations .js'


export const createOrder = async (amount) => {
    try {
        // const amount = Number(req.body.amount)
        const option = {
            amount: amount * 100, // ₹500
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(option)

        return order
    } catch (e) {
        console.log(e)
    }
}

export const verifyPayment = async (req, res) => {
    try {
        console.log('verify pay')
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            })
        }

        await RegEvent.updateOne({ razorpayOrderId: razorpay_order_id }, {
            bookingStatus: "confirmed",
            paymentStatus: "paid",
            razorpayPaymentId: razorpay_payment_id
        })

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        })

    } catch (e) {
        console.log(e)
    }
}