const express = require('express');
const { sendEmail } = require('../config/mailer');
const router = express.Router();

// Newsletter subscription endpoint
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Prepare form data for email
    const formData = { email };

    // Send email notification
    await sendEmail(formData, 'newsletter', 'Website Footer');

    // Log subscription (in production, you might want to save to database)
    console.log(`📧 New newsletter subscription: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process subscription. Please try again later.'
    });
  }
});

module.exports = router;





