const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_NAME,
        pass: process.env.USER_PASS,
      },
      tls: {
        // do not fail on invalid certss
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail({
      from: process.env.USER_NAME,
      to: email,
      subject: subject,
      text: text,
      /*       tls: {
        rejectUnauthorized: false,
      }, */
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
module.exports = sendEmail;
