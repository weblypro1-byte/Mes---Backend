const nodemailer = require('nodemailer');

// Create real transporter with your Gmail credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
    console.log('Using email:', process.env.EMAIL_USER);
  }
});

// Email template function
const createEmailTemplate = (formData, formType, pageName) => {
  const currentTime = new Date().toLocaleString();
  
  let emailSubject = '';
  let emailBody = '';
  let userEmailSubject = '';
  let userEmailBody = '';

  switch (formType) {
    case 'newsletter':
      emailSubject = `New Submission Mail - MES Website`;
      emailBody = `
        <h2>New Submission Mail</h2>
        <p><strong>Page:</strong> ${pageName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subscription Time:</strong> ${currentTime}</p>
        <hr>
        <p><em>From Modern Enterprise Solutions Website</em></p>
      `;
      
      userEmailSubject = ` Welcome to MES Newsletter!`;
      userEmailBody = `
        <h2>Thank You for Submission!</h2>
        <p>Dear Subscriber,</p>
        <p>Thank you for submission to Modern Enterprise Solutions LLC newsletter. You'll receive our latest updates, news, and offers.</p>
        <p><strong>Your email:</strong> ${formData.email}</p>
        <p><strong>Submission date:</strong> ${currentTime}</p>
        <hr>
        <p>Best regards,<br>Modern Enterprise Solutions LLC</p>
      `;
      break;

    case 'contact':
      emailSubject = ` New Contact Form - MES Website`;
      emailBody = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Page:</strong> ${pageName}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${formData.message || 'No message provided'}
        </div>
        <p><strong>Submission Time:</strong> ${currentTime}</p>
        <hr>
        <p><em>From Modern Enterprise Solutions Contact Page</em></p>
      `;
      
      userEmailSubject = `Thank You for Contacting MES`;
      userEmailBody = `
        <h2>Thank You for Contacting Us!</h2>
        <p>Dear ${formData.name},</p>
        <p>We have received your message as soon.</p>
        <p><strong>Your message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${formData.message || 'No message provided'}
        </div>
        <p><strong>Submitted on:</strong> ${currentTime}</p>
        <hr>
        <p>Best regards,<br>Modern Enterprise Solutions LLC<br>Email: Gov-Buy@modern-sol.com</p>
      `;
      break;

    case 'partner':
      emailSubject = `New Partnership Inquiry - MES Website`;
      emailBody = `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Page:</strong> ${pageName}</p>
        <p><strong>Contact Person:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Organization:</strong> ${formData.organization}</p>
        <p><strong>Organization Size:</strong> ${formData.orgSize}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${formData.message}
        </div>
        <p><strong>Submission Time:</strong> ${currentTime}</p>
        <hr>
        <p><em>From Modern Enterprise Solutions Partners Page</em></p>
      `;
      
      userEmailSubject = `Partnership Inquiry Received - MES`;
      userEmailBody = `
        <h2>Partnership Inquiry Received</h2>
        <p>Dear ${formData.firstName} ${formData.lastName},</p>
        <p>Thank you for your interest in partnering with Modern Enterprise Solutions LLC. We have received your inquiry and our partnership team will contact you shortly.</p>
        <p><strong>Your details:</strong></p>
        <ul>
          <li><strong>Organization:</strong> ${formData.organization}</li>
          <li><strong>Organization Size:</strong> ${formData.orgSize}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
        </ul>
        <p><strong>Your message:</strong> ${formData.message}</p>
        <p><strong>Submitted on:</strong> ${currentTime}</p>
        <hr>
        <p>Best regards,<br>Partnership Team<br>Modern Enterprise Solutions LLC</p>
      `;
      break;

    case 'product':
      emailSubject = `New Product Inquiry - MES Website`;
      emailBody = `
        <h2>New Product/Service Inquiry</h2>
        <p><strong>Page:</strong> ${pageName}</p>
        <p><strong>Contact Person:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Organization:</strong> ${formData.organization}</p>
        <p><strong>Organization Size:</strong> ${formData.orgSize}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${formData.message}
        </div>
        <p><strong>Submission Time:</strong> ${currentTime}</p>
        <p><strong>Interested in:</strong> MES Products & Services</p>
        <hr>
        <p><em>From Modern Enterprise Solutions Products & Services Page</em></p>
      `;
      
      userEmailSubject = `Product Inquiry Received - MES`;
      userEmailBody = `
        <h2>Product Inquiry Received</h2>
        <p>Dear ${formData.firstName} ${formData.lastName},</p>
        <p>Thank you for your interest in Modern Enterprise Solutions products and services. Our expert team will contact you shortly to discuss your requirements.</p>
        <p><strong>Your details:</strong></p>
        <ul>
          <li><strong>Organization:</strong> ${formData.organization}</li>
          <li><strong>Organization Size:</strong> ${formData.orgSize}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
        </ul>
        <p><strong>Your message:</strong> ${formData.message}</p>
        <p><strong>Submitted on:</strong> ${currentTime}</p>
        <hr>
        <p>Best regards,<br>Sales Team<br>Modern Enterprise Solutions LLC<br>Email: Gov-Buy@modern-sol.com</p>
      `;
      break;
  }

  return {
    ownerEmail: {
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
              .content { background: white; padding: 20px; border: 1px solid #ddd; }
              .footer { background: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Modern Enterprise Solutions LLC</h1>
                <p>Website Form Submission</p>
              </div>
              <div class="content">
                ${emailBody}
              </div>
              <div class="footer">
                <p>This email was automatically generated from MES website contact form.</p>
                <p>Modern Enterprise Solutions LLC &copy; ${new Date().getFullYear()}</p>
              </div>
            </div>
          </body>
        </html>
      `
    },
    userEmail: {
      subject: userEmailSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
              .content { background: white; padding: 20px; border: 1px solid #ddd; }
              .footer { background: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Modern Enterprise Solutions LLC</h1>
                <p>Thank You for Contacting Us</p>
              </div>
              <div class="content">
                ${userEmailBody}
              </div>
              <div class="footer">
                <p>Modern Enterprise Solutions LLC &copy; ${new Date().getFullYear()}</p>
                <p>Email: Gov-Buy@modern-sol.com | Website: www.modern-sol.com</p>
              </div>
            </div>
          </body>
        </html>
      `
    }
  };
};

// Send email function
const sendEmail = async (formData, formType, pageName) => {
  try {
    const emailConfig = createEmailTemplate(formData, formType, pageName);
    
    console.log(`📧 Preparing to send emails for ${formType} form from ${pageName}`);

    // Send email to MES owner
    const ownerMailOptions = {
      from: `"MES Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'Gov-Buy@modern-sol.com',
      subject: emailConfig.ownerEmail.subject,
      html: emailConfig.ownerEmail.html,
      replyTo: formData.email || process.env.EMAIL_USER
    };

    // Send confirmation email to user
    const userMailOptions = {
      from: `"Modern Enterprise Solutions" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: emailConfig.userEmail.subject,
      html: emailConfig.userEmail.html
    };

    // Send both emails
    const ownerResult = await transporter.sendMail(ownerMailOptions);
    const userResult = await transporter.sendMail(userMailOptions);
    
    console.log(`Emails sent successfully!`);
    console.log(`   To MES: ${ownerMailOptions.to}`);
    console.log(`   To User: ${userMailOptions.to}`);
    
    return { success: true, messageId: ownerResult.messageId };
  } catch (error) {
    console.error(`Error sending email:`, error);
    throw new Error('Failed to send email');
  }
};

module.exports = { transporter, sendEmail, createEmailTemplate };