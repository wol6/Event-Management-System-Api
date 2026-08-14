import dotenv from "dotenv"
dotenv.config()
import nodemailer from 'nodemailer'

const emailBaseUrl = process.env.BACKENDURL

const emailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.OWNEREMAIL,
        pass: process.env.GMAILPASS
    }
})

emailTransporter.verify((error, success) => {
    if (error) {
        console.error("SMTP ERROR:", error);
    } else {
        console.log("SMTP READY:", success);
    }
})


export async function sendAdminEmail(name, email) {
    const htmlString = `
<div style="font-family: Arial, sans-serif; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">

    <h2 style="color: #333;">New Admin Approval Request</h2>

    <p>Hello Admin,</p>

    <p>A new user has requested administrator access. Please review the details below:</p>

    <table style="border-collapse: collapse;">
        <tr>
            <td><strong>Name:</strong></td>
            <td>${name}</td>
        </tr>
        <tr>
            <td><strong>Email:</strong></td>
            <td>${email}</td>
        </tr>
    </table>

    <br>

    <a href="${emailBaseUrl}/admin/approve/${email}"
       style="
            display: inline-block;
            background-color: #28a745;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;">
        Approve Admin
    </a>

    <p style="margin-top: 30px;">
        If you were not expecting this request, you may safely ignore this email.
    </p>

    <hr>

    <p style="margin: 0;">
        Regards,<br>
        <strong>Event Management System</strong><br>
        Support Team<br>
        📧 support@eventmanagement.com
    </p>

</div>
`
    try {

        await emailTransporter.sendMail({
            from: email, //user
            to: "alwynmathew007@gmail.com",//admin
            subject: "Admin Approval Request",
            html: htmlString
        })
        console.log('admin email sent')

    } catch (err) {
        console.log(err)
    }
}

export async function sendVerifyEmail(name, email) {
    try {
        const htmlString = `
<div style="max-width:900px;margin:auto;padding:30px;font-family:Arial,sans-serif;border:1px solid #e5e5e5;border-radius:10px;background:#ffffff;">

    <h2 style="color:#333;text-align:center;">
        Verify Your Email Address
    </h2>

    <p>Hello <strong>${name}</strong>,</p>

    <p>
        Thank you for registering with <strong>Event Management System</strong>.
        Please verify your email address to activate your account.
    </p>

    <div style="text-align:center;margin:35px 0;">
        <a href="${emailBaseUrl}/email/verify/${encodeURIComponent(email)}"
           style="
                display:inline-block;
                background:#2563eb;
                color:#ffffff;
                text-decoration:none;
                padding:14px 28px;
                border-radius:6px;
                font-size:16px;
                font-weight:bold;">
            Verify Email
        </a>
    </div>

    <p>
        If the button above doesn't work, copy and paste the following link into your browser:
    </p>

    <p style="word-break:break-all;color:#2563eb;">
        ${emailBaseUrl}/email/verify/${encodeURIComponent(email)}
    </p>

    <p>
        This verification link is valid for <strong>24 hours</strong>.
    </p>

    <p>
        If you didn't create an account, you can safely ignore this email.
    </p>

    <hr style="margin:30px 0;border:none;border-top:1px solid #ddd;">

    <p style="margin:0;color:#666;">
        Regards,<br>
        <strong>Event Management System</strong><br>
        Support Team<br>
        📧 support@eventmanagement.com
    </p>

</div>
`;

        await emailTransporter.sendMail({
            from: 'donotreply@test.com', //admin
            to: email,//user
            subject: "Verify Email",
            html: htmlString
        })
        console.log('verify email sent')

    } catch (err) {
        console.log(err)
    }
}
