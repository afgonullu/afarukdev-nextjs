'use server';

import nodemailer from 'nodemailer';

import config from './config';

// eslint-disable-next-line import/prefer-default-export
export async function sendMail(otpText: unknown) {
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

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
}
