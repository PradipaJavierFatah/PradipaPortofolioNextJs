"use server";

import nodemailer from "nodemailer";

import { z } from "zod";

const ContactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export async function sendEmail(prevState: any, formData: FormData) {
    const validatedFields = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed. Please check your inputs.",
        };
    }

    const { name, email, subject, message } = validatedFields.data;

    // 1. Configure the transporter
    // NOTE: User must provide these in .env.local
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        // 2. Send the email
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: "pradipajavierfatah.id@gmail.com",
            subject: `Portfolio Contact: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333;">New Message from Portfolio</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <h3 style="color: #555;">Message:</h3>
                    <p style="white-space: pre-wrap; color: #666; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `,
        });

        return { success: true, message: "Email sent successfully!" };
    } catch (error) {
        console.error("Email send error:", error);
        return { success: false, message: "Failed to send email. Server configuration error." };
    }
}
