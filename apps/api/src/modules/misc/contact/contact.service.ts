import { ContactInputSchema } from "modules/misc/contact/index.js";
import { RequestError } from "utils/error.js";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendMessage = async (data: ContactInputSchema): Promise<void> => {
    try {
        const { name, email, message } = data;

        if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new RequestError("Email forwarding is not set up", 500, null);
        }

        const transporter: Transporter = nodemailer.createTransport(new SMTPTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT), // Port 465 for SSL, or use 587 for TLS
            secure: process.env.SMTP_PORT === "465", // true for port 465, false for port 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        }));

        const mailOptions = {
            from: 'Daylytic Contact: <your_email@example.com>',
            to: process.env.SMTP_USER, // Your destination email address
            subject: `New contact message from ${name}`,
            text: `You have received a new message from ${name} (${email}):\n\n${message}`
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        throw new RequestError("Problem occured while fetching sending email", 500, err);
    }
};

export const contactService = {
    sendMessage,
}