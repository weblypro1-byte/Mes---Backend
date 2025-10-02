const express = require('express');
const { sendEmail } = require('../config/mailer');
const router = express.Router();

// Partner form endpoint
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, organization, orgSize, email, phone, message } = req.body;

    // Validation
    const requiredFields = ['firstName', 'lastName', 'organization', 'orgSize', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
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
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      organization: organization.trim(),
      orgSize: orgSize.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message ? message.trim() : 'No message provided'
    };

    // Send email notification
    await sendEmail(formData, 'partner', 'Partners Page');

    // Log partner submission
    console.log(`🤝 New partner inquiry from: ${firstName} ${lastName} (${organization})`);

    res.status(200).json({
      success: true,
      message: 'Thank you for your partnership inquiry! We will contact you soon.'
    });

  } catch (error) {
    console.error('Partner form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit partnership inquiry. Please try again later.'
    });
  }
});

module.exports = router;