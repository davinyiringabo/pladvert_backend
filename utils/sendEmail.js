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

const sendEmail = async (email, code, res) => {
  try {
    const transporter = createTransporter();

    if (!email || !code) {
      res.send({ message: "Internal Server Error!", status: 400 }).status(400);
      return;
    }

    const mailOptions = {
      from: "Your Platform",
      to: email,
      subject: "Account Verification Code - Place Pulse",
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
      <div style="font-family: 'Quicksand', 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 15px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF; text-align: center; font-size: 25px; margin-bottom: 10px;">🌟 Welcome to Place Pulse! 🌟</h2>
      <p style="color: #555; text-align: center; font-size: 16px;">Congratulations! You are now officially a part of the Place Pulse family.</p>
      <div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #007BFF; font-size: 20px; margin: 0;">Explore the Best Places and Accommodations! 🌈</h1>
      </div>
      <p style="color: #555; text-align: center; margin-top: 16px; font-size: 18px;">To get started with discovering amazing destinations and accommodations, here's a special code to verify your account:</p>
      
      <div style="text-align: center; padding: 15px; background-color: #007BFF; border-radius: 8px; margin-top: 15px;">
          <p style="color: #fff; font-size: 24px; margin: 0;">Your Verification Code: <strong>${code}</strong></p>
      </div>
  
      <p style="color: #555; text-align: center; margin-top: 20px; font-size: 16px;">Start planning your next adventure with Place Pulse! If you have any questions or need assistance, our team is here to help.</p>
  
      <p style="color: #555; text-align: center; margin-top: 20px; font-size: 16px;">Best Wishes for Your Adventures,<br/>The Place Pulse Team 🌟</p>
      </div>
  
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("email sending --> ", info);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = sendEmail;
