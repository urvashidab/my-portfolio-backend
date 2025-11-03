import mongoose from "mongoose";
import User from "../Model/contactModel.js";
import nodemailer from "nodemailer";

export const contactUser = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: `Please provide Name, Email and Message`,
      });
    }

    const contact = await User.create({ name, email, message });

    // create nodemailer transporter

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // email format

    const mailoptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Message from portfolio contact form`,
      html: `
  <div style="
    background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
    border-radius: 12px;
    padding: 24px;
    max-width: 500px;
    margin: 20px auto;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
  ">
    <h2 style="
      text-align: center;
      color: #ff0080;
      border-bottom: 2px solid #ffb6c1;
      padding-bottom: 8px;
    ">
      💌 New Message from Your Portfolio
    </h2>

    <div style="margin-top: 20px;">
      <p style="font-size: 16px; margin: 10px 0;">
        <strong>Name:</strong> ${name}
      </p>
      <p style="font-size: 16px; margin: 10px 0;">
        <strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a>
      </p>
      <p style="font-size: 16px; margin: 10px 0;">
        <strong>Message:</strong><br>
        <span style="display: inline-block; margin-top: 8px; padding: 10px; background-color: #f8f9fa; border-left: 4px solid #ff0080; border-radius: 6px;">${message}</span>
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <footer style="text-align: center; font-size: 13px; color: #666;">
      <p>🚀 Sent automatically from your <strong>Portfolio Contact Form</strong></p>
      <p style="margin-top: 5px;">Do not reply directly to this email.</p>
    </footer>
  </div>
`,
    };

    // send email

    await transporter.sendMail(mailoptions);

    res.status(200).json({
      success: true,
      message: `New contact is created and email send successfully.!!`,
      contact,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Something went wrong, try again..`,
      error: err.message,
    });
  }
};
