import nodemailer from 'nodemailer';
import { withEmailTemplate } from './template';
import { createToken } from '@germla/auth';
import { env } from "../env";

interface sendEmailData {
    to: string;
    replyTo?: string;
    subject: string;
    text?: string;
    html: string;
}

export const sendEmail = async (data: sendEmailData) => {
    let transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE_ENABLED, // true for 465, false for other ports
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASSWORD,
        },
        // logger: true,
        debug: env.DEBUG,
    })

    const emailDefaults = {
        from: `Germla <${process.env.MAIL_FROM || "noreply@germla.space"}>`,
    };

    await transporter.sendMail({ ...emailDefaults, ...data });
}

export const sendForgotPasswordEmail = async (userId: string, email: string, name?: string | null) => {
    const token = createToken(userId, email, {
        expiresIn: "1d",
    });
    const host = new URL(process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "https://germla.space/").host
    const link = `https://app.${host}/forgot-password/reset?token=${encodeURIComponent(
        token
    )}`;
    return sendEmail({
        to: email,
        subject: "Reset your Germla password",
        html: withEmailTemplate("Reset Password", "You're receiving this message because you recently requested a password recovery.", "Click the button below to reset your password.", "Reset Password", link)
    })
}

export const sendEmailVerification = async (userId: string, email: string, name?: string | null) => {
    const token = createToken(userId, email, {
        expiresIn: "1d",
    });
    const host = new URL(process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "https://germla.space/").host
    const verifyLink = `https://app.${host}/verify?token=${encodeURIComponent(token)}`;
    return sendEmail({
        to: email,
        subject: "Welcome to Germla!",
        html: withEmailTemplate(`Welcome${name ? `!, ${name}` : '!'}`, "You're receiving this email because you recently signed up for an account", "Confirm your email address by clicking the button below.", "Confirm Email", verifyLink)
    })
}

export const sendResetPasswordNotification = async (email: string) => {
    const host = new URL(process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "https://germla.space/").host
    const loginLink = `https://app.${host}/login`;
    return sendEmail({
        to: email,
        subject: "Your Germla password has been changed",
        html: withEmailTemplate(`Password Changed`, "You're receiving this email because your Germla account's password was recently changed.", "Login to your account by clicking the button below.", "Login", loginLink, false)
    })
}

// TODO: Welcome Email