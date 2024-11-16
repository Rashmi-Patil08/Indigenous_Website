const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rmp.8994@gmail.com',
    pass: 'irsb esyl mvvn jqwf'
  }
});

// Function to send email with an attachment
const sendEmailWithAttachment = async (to, subject, text, filePath) => {
  try {
    const mailOptions = {
      from: 'rmp.8994@gmail.com',
      to,
      subject,
      text,
      attachments: [
        {
          path: filePath // File to attach
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info.response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmailWithAttachment;
