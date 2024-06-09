import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { firstName, lastName, email, message, recaptchaToken } = req.body;

  // Verify reCAPTCHA token
  const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`, {
    method: 'POST'
  });
  const recaptchaData = await recaptchaResponse.json();

  if (!recaptchaData.success) {
    return res.status(400).send('reCAPTCHA verification failed');
  }

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: 'colinqu73@gmail.com', // Replace with the recipient email
    subject: `Contact form submission from ${firstName} ${lastName}`,
    text: `You have a new message from your contact form:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
