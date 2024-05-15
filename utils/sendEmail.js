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

const sendEmail = async (email, code) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: "David NYIRINGABO",
      to: email,
      subject: "JHK Hospital Account Verification Code",
      html: `
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@1,6..12,300&family=Poppins:ital,wght@0,100;0,300;1,300&family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
      </head>
      <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 15px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF; text-align: center; font-size: 30px; margin-bottom: 10px;">🌟 Welcome to JHK Hospital! 🌟</h2>
      <p style="color: #555; text-align: center; font-size: 18px;">Congratulations! You are now officially a part of the JHK Hospital family.</p>
      <div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #007BFF; font-size: 40px; margin: 0;">Wishing You a good job! 🌈</h1>
      </div>
      <p style="color: #555; text-align: center; margin-top: 20px; font-size: 18px;">To kickstart your journey with us, here's a warm virtual hug and a special code to verify your account:</p>
      
      <div style="text-align: center; padding: 15px; background-color: #007BFF; border-radius: 8px; margin-top: 15px;">
          <p style="color: #fff; font-size: 24px; margin: 0;">Your Verification Code: <strong>${code}</strong></p>
      </div>
  
      <p style="color: #555; text-align: center; margin-top: 20px; font-size: 18px;">Feel free to explore our user-friendly app, designed with you in mind. Should you have any questions or need assistance, our dedicated support team is here for you!</p>
  
      <p style="color: #555; text-align: center; margin-top: 20px; font-size: 18px;">Best Wishes for Your Health and Wellness,<br/>The JHK Hospital Team 🌟</p>
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

module.exports = sendEmail;
