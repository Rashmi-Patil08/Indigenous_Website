<template>
    <div class="support-service">
      <h1>Support Services</h1>
      <p>
        Our platform is committed to providing the necessary support services to ensure the health and well-being of Indigenous communities. We offer a range of services tailored to meet the unique needs of our audience.
      </p>
  
      <section class="services">
        <div class="service">
          <h2>Mental Health Support</h2>
          <p>
            Access culturally sensitive mental health resources, including counseling, crisis intervention, and self-care tips specifically designed for Indigenous communities.
          </p>
        </div>
  
        <div class="service">
          <h2>Health Education</h2>
          <p>
            We offer educational resources that promote health awareness, prevention strategies, and wellness practices, all tailored to Indigenous cultural practices and beliefs.
          </p>
        </div>
  
        <div class="service">
          <h2>Community Outreach</h2>
          <p>
            Our community outreach programs focus on connecting Indigenous people with the healthcare services they need, including mobile clinics, workshops, and support groups.
          </p>
        </div>
  
        <div class="service">
          <h2>Telehealth Services</h2>
          <p>
            We provide telehealth services to ensure that even remote communities have access to quality healthcare. Our telehealth platform connects patients with healthcare providers in real-time.
          </p>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'SupportService'
  }
  </script>
  
  <style scoped>
  .support-service {
    margin: 20px;
    padding: 20px;
    background-color: #f4f9f9;
    border-radius: 10px;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #00796b;
    text-align: center;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    color: #004d40;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .services {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .service {
    background-color: #e0f7fa;
    border-radius: 10px;
    padding: 20px;
    width: 45%;
    margin-bottom: 20px;
  }
  
  .service h2 {
    font-size: 2rem;
    color: #004d40;
    margin-bottom: 10px;
  }
  
  .service p {
    font-size: 1.1rem;
    color: #004d40;
  }
  </style>
  