const express = require('express');
const { sendEmail } = require('../config/mailer');
const router = express.Router();

// Contact form endpoint
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields'
      });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Prepare form data for email
    const formData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : 'No subject provided',
      message: message ? message.trim() : 'No message provided'
    };

    // Send email notification
    await sendEmail(formData, 'contact', 'Contact Page');

    // Log contact submission
    console.log(`New contact form submission from: ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

module.exports = router;



