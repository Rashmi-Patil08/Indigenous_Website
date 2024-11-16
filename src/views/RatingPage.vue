<template>
  <div class="rating-container">
    <h1>Rate and Review the Service</h1>

    <!-- Rating form -->
    <form @submit.prevent="submitRating">
      <label for="rating">Select your rating:</label>
      
      <!-- 5 Star Rating -->
      <div class="stars">
        <span 
          v-for="n in 5" 
          :key="n" 
          class="star" 
          :class="{ 'selected': newRating >= n }" 
          @click="setRating(n)"
        >★</span>
      </div>

      <!-- Display error message if rating is not selected -->
      <p v-if="errors.rating" class="error">{{ errors.rating }}</p>

      <!-- Feedback Text Area -->
      <textarea 
        v-model="newFeedback" 
        placeholder="Leave your feedback here..." 
        required
        maxlength="500"
      ></textarea>
      
      <!-- Display error message if feedback is invalid -->
      <p v-if="errors.feedback" class="error">{{ errors.feedback }}</p>

      <!-- Character limit message -->
      <p class="char-limit">Max 500 characters</p>

      <button type="submit">Submit Rating</button>
    </form>

    <!-- Display user reviews -->
    <div v-if="ratings.length > 0">
      <h3>Reviews:</h3>
      <ul>
        <li v-for="(rating, index) in ratings" :key="index">
          <strong>{{ rating.username }}</strong> 
          <span class="stars">
            <!-- Ensure rating.stars is a valid number between 0 and 5 -->
            <span v-for="n in Math.min(5, Math.max(0, rating.stars || 0))" :key="'filled' + n" class="star">★</span>
            <span v-for="n in (5 - Math.min(5, Math.max(0, rating.stars || 0)))" :key="'empty' + n" class="star">☆</span>
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
.rating-container {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

form {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
}

button {
  margin-top: 10px;
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

/* Error message styling */
.error {
  color: red;
  font-size: 0.9em;
}

.char-limit {
  font-size: 0.8em;
  color: grey;
}

.star {
  font-size: 30px;
  cursor: pointer;
  color: #ccc;
}

.star.selected {
  color: gold;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
