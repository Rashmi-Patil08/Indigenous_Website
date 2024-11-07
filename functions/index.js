/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Cloud function to set a custom role (e.g., 'admin') to a user
exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check if request is made by an authenticated user
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );
  }

  // Verify that the requesting user has appropriate privileges (if needed)
  if (context.auth.token.role !== 'superadmin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only superadmins can assign roles.'
    );
  }

  // Set a custom claim (e.g., 'admin') on the user with the provided email
  return admin.auth().getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        role: data.role // 'admin' or 'user' or any other role you want to set
      });
    })
    .then(() => {
      return { message: `Success! ${data.email} has been assigned the role of ${data.role}.` };
    })
    .catch(error => {
      throw new functions.https.HttpsError('unknown', error.message, error);
    });
});
