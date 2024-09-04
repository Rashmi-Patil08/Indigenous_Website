<template>
    <div class="home">
      <header>
        <h1>Welcome to the Indigenous Health Platform</h1>
        <p>Improving the health and well-being of Indigenous communities across Australia.</p>
      </header>
  
      <section class="mission-statement">
        <!-- <h2>Our Mission</h2> -->
        <!-- <p>
          Our mission is to bridge the gap between traditional healthcare and the unique needs of Indigenous communities by providing culturally relevant resources, education, and support.
        </p> -->
      </section>
  
      <section class="main-goals">
        <!-- <h2>Main Goals</h2>
        <ul>
          <li>Expand access to culturally appropriate healthcare information.</li>
          <li>Encourage community involvement and provide a platform for sharing experiences.</li>
          <li>Offer focused tools and resources for mental health support.</li>
        </ul> -->
      </section>
  
      <section class="target-audience">
        <!-- <h2>Target Audience</h2>
        <p>
          Our platform is designed for Indigenous community members, healthcare providers, and organizations focusing on Indigenous health. We ensure that all content is respectful, informative, and culturally sensitive.
        </p> -->
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  }
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin: 20px;
  }
  
  header {
    background-color: #e0f7fa;
    padding: 20px;
    border-radius: 10px;
  }
  
  .mission-statement,
  .main-goals,
  .target-audience {
    margin-top: 30px;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #00796b;
  }
  
  h2 {
    font-size: 2rem;
    color: #004d40;
  }
  
  p {
    font-size: 1.2rem;
    color: #004d40;
  }
  
  ul {
    list-style-type: disc;
    margin-left: 40px;
    text-align: left;
    color: #004d40;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>
  