<template>
  <div class="home" id="page">
    <section class="site-desc">
      <img src="http://placehold.it/500x500" alt="Luis Augusto"/>
      <p>I am a Fullstack developer with a focus on JavaScript toolsets to deliver performant, scalable, and secure web applications.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home'
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}

section {
  min-height: 50vh;
  box-sizing: border-box;
  padding: 30px 0;
}

section.site-desc {
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    width: 300px;
    height: 300px;
    margin-right: 30px;
    flex-shrink: 0;
  }

  p {
    font-size: 2em;
    margin: auto;
    line-height: 1.5;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;

    img {
      margin: 0 auto 30px;
    }
  }
}
</style>
