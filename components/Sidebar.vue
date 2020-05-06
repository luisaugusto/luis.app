<template>
  <section class="sidebar">
    <div class="sidebar-container">
      <img src="~/assets/profile.jpg" alt="Luis Augusto" />
      <hr />
      <h1 class="title">Luis Augusto</h1>
      <SocialMedia></SocialMedia>
    </div>
  </section>
</template>

<script>
import SocialMedia from '~/components/SocialMedia'

export default {
  components: {
    SocialMedia
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/colors';

img {
  max-width: 100%;
  display: block;
  margin: auto;
}

.sidebar {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  top: 0;
  box-sizing: border-box;

  @media (min-width: 768px) {
    position: sticky;
  }

  .sidebar-container {
    display: grid;
    grid-gap: 20px;

    .title {
      text-align: center;
      font-size: 32px;
      font-weight: 350;
      font-variation-settings: 'MONO' 1;
      line-height: 0.8;
      margin: 0;
      padding: 0;
      border: none;
    }
  }
}
</style>
