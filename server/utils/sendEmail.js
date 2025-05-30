const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const sendBookingConfirmation = async (to, movieTitle, ticketCount, screeningDate, screeningTime) => {
    // console.log(process.env.EMAIL_USER)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Your Movie Ticket Booking Confirmation 🎟️',
    html: `
      <h2>Thank you for booking!</h2>
      <p>You’ve successfully booked <strong>${ticketCount}</strong> ticket(s) for <strong>${movieTitle}</strong>.</p>
      <p>Screening Date: ${screeningDate}</p>
      <p>Screening Time: ${screeningTime}</p>
      <p>Enjoy your movie!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookingConfirmation
