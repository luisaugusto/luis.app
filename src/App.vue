<template>
  <div id="app">
    <app-header/>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
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
body {
  margin: 0;
  background: #efefef;
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
}
</style>
