<template>
  <div id="app">
    <NavigationBar />
    <!-- Only use one of the following two lines -->
    <!-- Option 1: Use HomePage component directly -->
    <!-- <HomePage /> -->

    <!-- Option 2: Use router-view to display routed components -->
    <router-view />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    
  }
}
</script>
