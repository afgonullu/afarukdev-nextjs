'use server';

import nodemailer from 'nodemailer';

import config from './config';

export async function sendMail(otpText) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.nodeMailerEmailFrom,
      pass: config.nodeMailerPw,
    },
  });

  const mailOptions = {
    from: config.nodeMailerEmailFrom,
    to: config.nodeMailerEmailTo,
    subject: 'New Contact Form Submission',
    text: JSON.stringify(otpText),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error);
    } else {
      return true;
    }
  });
}
