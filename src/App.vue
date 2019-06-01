<template>
  <div id="app">
    <app-header />
    <router-view class="page" />
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
  --spacing: 30px;

  @media (max-width: 650px) {
    --spacing: 20px;
    --font-size: 12px;
  }
}

body {
  margin: 0;
  font-size: var(--font-size);
  background-image: url(../public/img/textures/asfalt-dark.png);
}

#app {
  font-family: 'Montserrat', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

.page,
nav {
  a {
    text-decoration: none;
    color: inherit;

    border-bottom: 1px dashed black;
    opacity: 0.7;
    transition: opacity 0.2s;
    font-weight: bold;

    &:hover {
      opacity: 1;
    }
  }
}

.page {
  max-width: 1200px;
  margin: auto;
  padding: 0 var(--spacing);
  box-sizing: border-box;

  p {
    margin: 0 0 calc(var(--spacing) / 2) 0;
    font-size: calc(var(--font-size) * 1.125);
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: calc(var(--spacing) / 2) 0;
    padding-left: 0;
    list-style: none;

    li {
      margin-bottom: calc(var(--spacing) / 3);

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
