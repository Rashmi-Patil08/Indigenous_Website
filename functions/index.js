/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const cors = require("cors")({origin: true});

// Example: A simple HTTP function that returns a greeting message
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.send("Hello from Firebase Cloud Functions!");
  });
});
