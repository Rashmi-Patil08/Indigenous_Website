<template>
  <div class="send-email-form">
    <h2>Send Email with Attachment</h2>

    <!-- Recipient Email -->
    <div class="form-group">
      <label for="recipientEmail">Recipient Email:</label>
      <input
        type="email"
        id="recipientEmail"
        v-model="recipientEmail"
        aria-label="Recipient Email"
        placeholder="Enter recipient's email"
        required
      />
      <span v-if="showErrors && !recipientEmailValid" class="error-message">Please enter a valid email address.</span>
    </div>

    <!-- Subject -->
    <div class="form-group">
      <label for="emailSubject">Subject:</label>
      <input
        type="text"
        id="emailSubject"
        v-model="emailSubject"
        aria-label="Email Subject"
        placeholder="Enter subject"
        required
      />
      <span v-if="showErrors && !emailSubjectValid" class="error-message">Subject is required.</span>
    </div>

    <!-- Message -->
    <div class="form-group">
      <label for="emailBody">Message:</label>
      <textarea
        id="emailBody"
        v-model="emailBody"
        aria-label="Email Body"
        placeholder="Enter your message"
        rows="5"
        required
      ></textarea>
      <span v-if="showErrors && !emailBodyValid" class="error-message">Message cannot be empty.</span>
    </div>

    <!-- File Upload -->
    <div class="form-group">
      <label for="fileUpload">Attachment:</label>
      <input
        type="file"
        id="fileUpload"
        @change="handleFileUpload"
        aria-label="File Upload"
        accept=".pdf, .docx, .png, .jpg"
      />
    </div>

    <!-- Send Button -->
    <button @click="sendEmail" aria-label="Send Email">Send Email</button>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        recipientEmail: '',
        emailSubject: '',
        emailBody: '',
        selectedFile: null
      };
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
      },
      async sendEmail() {
        try {
          const formData = new FormData();
          formData.append('to', this.recipientEmail);
          formData.append('subject', this.emailSubject);
          formData.append('text', this.emailBody);
          formData.append('filePath', this.selectedFile);
  
          const response = await axios.post('http://localhost:3000/send-email', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          alert('Email sent successfully: ' + response.data);
        } catch (error) {
          console.error('Error:', error.message);
          alert('Failed to send email');
        }
      }
    }
  };
  </script>
  

<style scoped>
/* General Styles */
.send-email-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.85;
}

button:focus {
  outline: 2px solid #4caf50;
  outline-offset: 2px;
}

/* Error Message Styles */
.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}

/* Responsive Design */
@media (max-width: 600px) {
  .send-email-form {
    padding: 15px;
  }

  button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
  