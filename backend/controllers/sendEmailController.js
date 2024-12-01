const nodemailer = require("nodemailer");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
   

    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: "osama.ayubwebdev@gmail.com",
      subject: "Contact Form Message",
      text: `You have received a message from ${name} (${email}:\n\n${message}`
    };


    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};


module.exports = sendContactMessage;
