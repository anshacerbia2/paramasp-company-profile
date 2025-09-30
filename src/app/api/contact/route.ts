import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const words = await getTranslations("global.words");

  try {
    const { fname, lname, phone, email, message } = await req.json();

    if (!fname || !lname || !email || !message) {
      return NextResponse.json(
        { error: words("res-message.404") },
        { status: 400 }
      );
    }

    // SMTP2GO setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp.smtp2go.com
      port: Number(process.env.SMTP_PORT),
      secure: false,
      // secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER, // username SMTP2GO
        pass: process.env.SMTP_PASS, // password SMTP2GO
      },
    });

    const mailOptions = {
      from: `NoReply <${process.env.FROM_EMAIL}>`,
      replyTo: email, // biar balasan tetap ke user
      // from: `"${fname} ${lname}" <${email}>`,
      to: process.env.CONTACT_TO_EMAIL, // email tujuan tim/admin
      subject: `Contact Us Form: ${fname} ${lname}`,
      text: `
Name: ${fname} ${lname}
Phone: ${phone || "-"}
Email: ${email}
Message: ${message}
      `,
      html: `
<p><strong>Name:</strong> ${fname} ${lname}</p>
<p><strong>Phone:</strong> ${phone || "-"}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong><br/>${message}</p>
      `,
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: words("res-message.200") });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: words("res-message.500") },
      { status: 500 }
    );
  }
}
