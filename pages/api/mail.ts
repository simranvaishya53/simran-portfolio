import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, message } = req.body;

    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.MAIL_TO || "your.email@gmail.com",
            subject: `${name} sent you a message from Portfolio`,
            html: `<p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong><br>${message}</p>`,
        });

        return res.status(200).json({ message: "Message sent successfully." });

    } catch (err: any) {
        return res.status(500).json({ message: `Error sending email: ${err.message}` });
    }
}
