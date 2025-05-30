const express = require('express')
const sendBookingConfirmation  =require('../utils/sendEmail');

const router = express.Router();

// POST /api/email/send
router.post('/send', async (req, res) => {
  const { email, movieTitle, ticketCount, screeningTime, screeningDate } = req.body;

  if (!email || !movieTitle || !ticketCount || !screeningDate || !screeningTime) {
    return res.status(400).json({ error: 'Missing email, movie title, screeningTime, screeningDate or ticket count' });
  }

  try {
    await sendBookingConfirmation(email, movieTitle, ticketCount, screeningDate, screeningTime);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
