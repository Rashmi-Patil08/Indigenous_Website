<template>
  <div class="rating-container">
    <h2>Rate and Review the Service</h2>

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

      <!-- Feedback Text Area -->
      <textarea v-model="newFeedback" placeholder="Leave your feedback here..." required></textarea>
      
      <button type="submit">Submit Rating</button>
    </form>

    <!-- Average Rating -->

    <!-- Display user reviews -->
    <!-- Display user reviews -->
<div v-if="ratings.length > 0">
  <h3>Reviews:</h3>
  <ul>
    <li v-for="(rating, index) in ratings" :key="index">
      <strong>{{ rating.username }}</strong> 
      <span class="stars">
        <!-- Ensure rating.stars is a valid number between 0 and 5 -->
        <span v-for="n in Math.min(5, Math.max(0, rating.stars || 0))" :key="'filled' + n" class="star">★</span>
        <!-- <span v-for="n in (5 - Math.min(5, Math.max(0, rating.stars || 0)))" :key="'empty' + n" class="star">☆</span> -->
      </span>
      <p>{{ rating.feedback }}</p>
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

const newRating = ref(0);
const newFeedback = ref('');
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

// Function to submit a new rating and review
const submitRating = () => {
  if (newRating.value && newFeedback.value) {
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


</style>
