<template>
  <div class="rating-container">
    <h1 id="rating-title">Rate and Review the Service</h1>

    <!-- Rating form -->
    <form @submit.prevent="submitRating" aria-labelledby="rating-title">
      <label for="rating">Select your rating:</label>
      
      <!-- 5 Star Rating -->
      <div class="stars" role="radiogroup" aria-labelledby="rating-title">
        <span 
          v-for="n in 5" 
          :key="n" 
          class="star" 
          :class="{ 'selected': newRating >= n }" 
          role="radio" 
          :aria-checked="newRating === n" 
          tabindex="0" 
          @click="setRating(n)" 
          @keydown.enter="setRating(n)"
        >★</span>
      </div>

      <!-- Display error message if rating is not selected -->
      <p v-if="errors.rating" class="error" role="alert">{{ errors.rating }}</p>

      <!-- Feedback Text Area -->
      <label for="feedback">Leave your feedback:</label>
      <textarea 
        id="feedback"
        v-model="newFeedback" 
        placeholder="Leave your feedback here..." 
        required
        maxlength="500"
        aria-required="true"
        aria-describedby="feedback-limit"
      ></textarea>
      
      <!-- Display error message if feedback is invalid -->
      <p v-if="errors.feedback" class="error" role="alert">{{ errors.feedback }}</p>

      <!-- Character limit message -->
      <p id="feedback-limit" class="char-limit">Max 500 characters</p>

      <button type="submit" aria-label="Submit your rating and feedback">Submit Rating</button>
    </form>

    <!-- Display user reviews -->
    <div v-if="ratings.length > 0">
      <h2>Reviews:</h2>
      <ul>
        <li v-for="(rating, index) in ratings" :key="index">
          <strong>{{ rating.username }}</strong> 
          <span class="stars">
            <!-- Gold stars for filled, gray stars for empty -->
            <span 
              v-for="n in Math.min(5, Math.max(0, rating.stars || 0))" 
              :key="'filled' + n" 
              class="star existing-star"
              aria-label="filled star"
            >★</span>
            <span 
              v-for="n in (5 - Math.min(5, Math.max(0, rating.stars || 0)))" 
              :key="'empty' + n" 
              class="star"
              aria-label="empty star"
            >☆</span>
          </span>
          <!-- Sanitize and display the feedback -->
          <p v-html="sanitizeHTML(rating.feedback)"></p>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>No reviews yet. Be the first to leave a review!</p>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import DOMPurify from 'dompurify';  // Import DOMPurify for sanitizing input

// Input data
const newRating = ref(0);
const newFeedback = ref('');

// Error messages for validation
const errors = ref({
  rating: '',
  feedback: ''
});

// Store all ratings and reviews
const ratings = ref([]);
const averageRating = ref(null);
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { username: 'Anonymous' };

// Fetch ratings from localStorage on mounted
onMounted(() => {
  const storedRatings = JSON.parse(localStorage.getItem('ratings')) || [];
  ratings.value = storedRatings;
  calculateAverageRating();
});

// Function to set the star rating
const setRating = (stars) => {
  newRating.value = stars;
};

// Function to validate inputs before submission
const validateInputs = () => {
  let isValid = true;

  // Rating must be between 1 and 5
  if (newRating.value < 1 || newRating.value > 5) {
    errors.value.rating = 'Please select a rating between 1 and 5 stars.';
    isValid = false;
  } else {
    errors.value.rating = ''; // Clear error if valid
  }

  // Feedback must not be empty and should be less than 500 characters
  if (newFeedback.value.trim() === '') {
    errors.value.feedback = 'Please provide feedback.';
    isValid = false;
  } else if (newFeedback.value.length > 500) {
    errors.value.feedback = 'Feedback cannot exceed 500 characters.';
    isValid = false;
  } else {
    errors.value.feedback = ''; // Clear error if valid
  }

  return isValid;
};

// Function to submit a new rating and review
const submitRating = () => {
  if (validateInputs()) {
    const newReview = {
      username: currentUser.username,
      stars: newRating.value,
      feedback: newFeedback.value
    };

    // Save the new rating and review
    ratings.value.push(newReview);
    localStorage.setItem('ratings', JSON.stringify(ratings.value));

    // Calculate new average rating
    calculateAverageRating();

    // Clear the form
    newRating.value = 0;
    newFeedback.value = '';
  }
};

// Function to sanitize HTML content (for security against XSS)
const sanitizeHTML = (input) => {
  return DOMPurify.sanitize(input);  // Sanitize the user feedback input
};

// Function to calculate the average rating
const calculateAverageRating = () => {
  if (ratings.value.length > 0) {
    const total = ratings.value.reduce((sum, rating) => sum + rating.stars, 0);
    averageRating.value = (total / ratings.value.length).toFixed(1); // Display one decimal
  } else {
    averageRating.value = null;
  }
};
</script>

<style scoped>
/* Container styling */
.rating-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

textarea:focus {
  outline: 2px solid #4caf50;
  box-shadow: 0 0 5px #4caf50;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.char-limit {
  font-size: 12px;
  color: gray;
}

.stars {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.star {
  font-size: 36px;
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s ease-in-out;
}

.star.selected {
  color: gold; /* Gold for new ratings */
}

.star.existing-star {
  color: gray; /* Gray for existing reviews */
}

/* Styling for review list */
ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

ul li strong {
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
}

ul li .stars {
  display: inline-flex;
  margin-bottom: 5px;
}
</style>
