const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    port: 465,
    secure: true,
  });
};

const sendVerificationEmail = async (email) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: "Your Platform",
      to: email,
      subject: "Email Verification Successful 🎉 - Place Pulse",
      html: `
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
      </head>
      <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 15px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF; text-align: center; font-size: 30px; margin-bottom: 10px;">🌟 Congratulations! Email Verified 🎉</h2>
      <p style="color: #555; text-align: center; font-size: 18px;">Your email has been successfully verified.</p>
      <div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #007BFF; font-size: 40px; margin: 0;">Thank You for Joining Place Pulse! </h1>
      </div>
      <p style="color: #555; text-align: center; margin-top: 20px; font-size: 18px;">You are now part of our community. Start exploring the best places and accommodations today!</p>
  
      <p style="color: #555; text-align: center; margin-top: 20px; font-size: 18px;">Best Wishes for Your Adventures,<br/>The Place Pulse Team 🌟</p>
      </div>
  
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = sendVerificationEmail;
