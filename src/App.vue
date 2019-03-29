<template>
  <div id="app">
    <app-header/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';

export default {
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
:root {
  --accent-color: #009063;
  --font-size: 16px;
}

body {
  margin: 0;
  background: #defff5;
  font-size: var(--font-size);
}

#app {
  font-family: 'Montserrat', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;

  a {
    text-decoration: none;
    color: inherit;
  }

  #page {
    max-width: 1200px;
    margin: auto;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
