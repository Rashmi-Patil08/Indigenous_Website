<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <send-email />
  </div>
</template>

<script>
import SendEmail from './SendEmail.vue';


export default {
  components: {
    SendEmail
  }
};
</script>

<style scoped>
h1{
  color: blueviolet;
  text-align : center;
}


</style>
