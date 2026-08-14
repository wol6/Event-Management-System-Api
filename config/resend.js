import dotenv from "dotenv"
dotenv.config()
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function resendEmailSender(sub,htmlString) {
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'alwynmathew007@gmail.com',
        subject:sub,
        html: htmlString
    });

    if (error) {
        return console.log(error);
    }
}