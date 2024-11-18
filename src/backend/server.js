const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer to handle file uploads
const sendEmailWithAttachment = require('./emailService');
const apiRoutes = require('../router/apiRoutes'); // Import the new API routes

const app = express();
const PORT = 3000;

app.use(cors()); // Allow CORS for all origins
app.use(bodyParser.json());

// Route: API Routes for users
app.use('/api', apiRoutes);


const upload = multer({ dest: 'uploads/' }); // Define file upload destination

app.post('/send-email', upload.single('filePath'), async (req, res) => {
  // Extract data from the request body
  const { to, subject, text } = req.body;
  const filePath = req.file ? req.file.path : null;

  // Log the incoming data to confirm what’s being received
  console.log("Received request data:");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Text:", text);
  console.log("File Path:", filePath);

  try {
    // Log data being sent to the email function
    console.log("Data being sent to sendEmailWithAttachment function:");
    console.log({ to, subject, text, filePath });

    // Call the email function with the received data
    const response = await sendEmailWithAttachment(to, subject, text, filePath);
    res.status(200).send('Email sent: ' + response);
  } catch (error) {
    // Log any errors during email sending
    console.error('Error sending email:', error.message);
    res.status(500).send('Failed to send email');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


