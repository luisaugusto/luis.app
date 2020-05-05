<template>
  <div class="layout">
    <Sidebar></Sidebar>
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'
import Footer from '~/components/Footer'

export default {
  components: {
    Sidebar,
    Footer
  }
}
</script>

<style lang="scss">
@import 'assets/colors';

@font-face {
  font-family: 'Recursive';
  src: url('/Recursive_VF_1.047.woff2') format('woff2-variations');
  font-weight: 300 1000;
}

body {
  margin: 0;
  background: $dark-blue;
}

.layout {
  font: 18px/1.3 'Recursive', Helvetica, sans-serif;
  color: $white;
  display: grid;
  min-height: 100vh;

  @media (min-width: 768px) {
    grid-auto-flow: column;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr auto;
  }

  > * {
    padding: 30px;
  }

  @media (min-width: 768px) {
    .page {
      height: 100vh;
      overflow: scroll;
      box-sizing: border-box;
      border-left: 2px solid $blue;
      grid-row: 1/3;
    }
  }

  @media (max-width: 767px) {
    .page {
      border-bottom: 2px solid $blue;
    }
  }

  p {
    margin: 0 0 15px;
  }

  .box {
    padding: 15px;
    border: 1px dashed $light-blue;
    box-sizing: border-box;
  }

  span.keyword {
    position: relative;
    font-weight: 350;

    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 33%;
      background: $red;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
  }

  h1,
  h2,
  h3 {
    font-variation-settings: 'MONO' 1;
  }

  h1 {
    font-weight: 300;
  }

  h1,
  h2 {
    margin: 0 0 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid $blue;
    line-height: 1;
  }

  h2 {
    margin-top: 30px;
  }

  h2,
  h3 {
    font-weight: 450;
  }

  h3 {
    margin: 0 0 15px;
  }

  hr {
    border: none;
    border-bottom: 1px solid $blue;
    margin: 0;
    width: 100%;
  }
}
</style>
