<template>
  <div>
    <h1>Geo Location</h1>
    <GeoMap />
  </div>
</template>

<script>
import GeoMap from "@/components/GeoMap.vue";

export default {
  components: {
    GeoMap,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
