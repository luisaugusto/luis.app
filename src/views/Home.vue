<template>
  <div class="home" id="page">
    <!-- TODO: Pull data from Contentful  -->
    <section :class="['site-desc', {descLoaded}]">
      <div>
        <img src="img.jpg" alt="Luis Augusto">
      </div>
      <p>
        <span>I am a fullstack developer with a focus on</span>
        <span>JavaScript toolsets to deliver performant,</span>
        <span>scalable, and secure web applications.</span>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      descLoaded: false
    };
  },
  mounted() {
    const vm = this;
    setTimeout(function() {
      vm.descLoaded = true;
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
section {
  box-sizing: border-box;
  padding: 30px 0;
}

section.site-desc {
  $btd: 1s; //base-transition-delay
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1169px) {
    flex-direction: column;
    text-align: center;
  }

  > div {
    flex-shrink: 0;
    margin: 0;
    width: 0px;
    transition: all $btd/2, filter $btd/2 $btd;
    overflow: hidden;
    filter: drop-shadow(0px 0px 5px transparent)
      drop-shadow(0px 0px 5px transparent);

    img {
      width: 300px;
      height: 300px;
      object-fit: cover;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      transition: all $btd/2 $btd/2;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  p {
    font-size: 2em;
    line-height: 1.5;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 10px;
    justify-items: flex-start;
    align-items: end;
    margin: 0;

    @media (max-width: 767px) {
      font-size: 4vw;
    }

    span {
      white-space: nowrap;
      height: 100%;
      max-width: 0px;
      max-height: calc(var(--font-size) * 3);
      line-height: 4;
      position: relative;
      overflow: hidden;
      transition: max-width 1s, line-height 0.75s;

      @media (max-width: 767px) {
        max-height: 6vw;
      }

      @for $i from 1 to 4 {
        &:nth-of-type(#{$i}) {
          $delay: ($i - 1) * 0.1;
          transition-delay: ($delay + $btd), (0.5s + $btd);
        }
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        background: red;
        width: 100%;
        height: 100%;
        transition: background-color 0.75s $btd, height 0.75s (0.5s + $btd);
        z-index: -1;
      }
    }
  }

  &.descLoaded {
    > div {
      width: 300px;
      margin: 0 45px 0 15px;
      filter: drop-shadow(15px 0px 0 var(--accent-color))
        drop-shadow(-15px 0px 0 var(--accent-color));

      @media (max-width: 1169px) {
        margin: 0 auto 15px;
      }

      img {
        clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
      }
    }

    p span {
      max-width: 900px;
      line-height: 1.5;

      &:before {
        background-color: rgba(255, 0, 0, 0.5);
        height: 50%;
      }
    }
  }
}
</style>
