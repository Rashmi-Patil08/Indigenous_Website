<template>
    <div class="send-email-form">
      <h2>Send Email with Attachment</h2>
      <input type="email" v-model="recipientEmail" placeholder="Recipient Email" />
      <input type="text" v-model="emailSubject" placeholder="Subject" />
      <textarea v-model="emailBody" placeholder="Message"></textarea>
      <input type="file" @change="handleFileUpload" />
      <button @click="sendEmail">Send Email</button>
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
  .send-email-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  input,
  textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>
  