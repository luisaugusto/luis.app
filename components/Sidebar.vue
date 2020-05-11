<template>
  <section class="sidebar">
    <div class="sidebar-container">
      <img
        src="~/assets/profile.jpg"
        alt="Luis Augusto"
        @load="imgLoaded = true"
        :class="{ imgLoaded }"
      />
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
  },
  data: () => ({
    imgLoaded: false
  })
}
</script>

<style lang="scss" scoped>
@import 'assets/colors';

img {
  max-width: 100%;
  display: block;
  margin: 120px auto;
  box-sizing: border-box;
  object-fit: cover;
  height: 0;
  width: 0;
  transition: width 0.3s, padding 0s 0.3s, padding-top 0.3s 0.3s,
    padding-bottom 0.3s 0.3s, height 0.3s 0.3s, margin 0.3s 0.3s;

  &.imgLoaded {
    outline: 1px solid $white;
    width: 240px;
    height: 240px;
    padding: 10px;
    margin-top: 0;
    margin-bottom: 0;
  }
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
