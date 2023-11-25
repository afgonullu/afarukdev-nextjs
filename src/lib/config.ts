const config = {
  url: process.env['NEXT_PUBLIC_CONTENT_API_URL'],
  key: process.env['NEXT_PUBLIC_CONTENT_API_KEY'],
  brevoUrl: process.env['BREVO_API_URL'],
  brevoKey: process.env['BREVO_API_KEY'],
  googleAnalyticsId: process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'],
  nodeMailerEmailFrom: process.env['NODEMAILER_EMAIL_FROM'],
  nodeMailerEmailTo: process.env['NODEMAILER_EMAIL_TO'],
  nodeMailerPw: process.env['NODEMAILER_PW'],
};

export default config;
