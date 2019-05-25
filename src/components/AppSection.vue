<template>
  <section
    :id="type"
    v-observe-visibility="{
      callback: activeSection
    }"
  >
    <h2
      v-if="header"
      v-observe-visibility="{
        callback: toggleHeader,
        once: true
      }"
      :class="{ visible }"
    >
      <span>{{ type }}</span>
    </h2>

    <component :is="type"></component>
  </section>
</template>

<script>
import Description from './Description.vue';
import Skillsets from './Skillsets.vue';
import Portfolio from './Portfolio.vue';
import Blog from './Blog.vue';
import Contact from './Contact.vue';
import { EventBus } from '../main.js';

export default {
  props: {
    type: String,
    header: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    toggleHeader(isVisible) {
      this.visible = isVisible;
    },
    activeSection(isVisible) {
      EventBus.$emit('setActiveSection', {
        type: this.type,
        isVisible
      });
    }
  },
  components: {
    Description,
    Skillsets,
    Portfolio,
    Blog,
    Contact
  }
};
</script>

<style lang="scss">
section {
  margin: calc(var(--spacing) * 2) 0;

  h2 {
    font-size: 3em;
    font-weight: normal;
    border-left: 5px solid var(--accent-color);
    margin: 0 0 var(--spacing);
    text-transform: capitalize;
    transition: clip-path 0.7s;
    clip-path: polygon(0% 50%, 100% 50%, 100% 50%, 0 50%);
    overflow: hidden;

    span {
      display: inline-block;
      position: relative;
      padding-left: var(--spacing);
      transform: translateX(-100%);
      transition: transform 0.7s 0.5s;

      &:first-letter {
        font-weight: bold;
      }
    }

    &.visible {
      clip-path: polygon(0% 00%, 100% 00%, 100% 100%, 0 100%);

      span {
        transform: translateX(0%);
      }
    }
  }

  .col-3 {
    display: grid;
    grid-gap: var(--spacing);
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }

  article {
    position: relative;
    filter: drop-shadow(5px 5px 0px var(--accent-color));

    $clip: var(--spacing);
    $nClip: calc(100% - #{$clip});

    &:before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      background-image: url(../../public/textures/brilliant.png);

      clip-path: polygon(
        $clip 0,
        $nClip 0,
        100% $clip,
        100% $nClip,
        $nClip 100%,
        $clip 100%,
        0 $nClip,
        0 $clip
      );
    }

    h3 {
      margin: 0;
      padding: var(--spacing);
      font-family: 'Major Mono Display';
      font-size: 2em;
      display: flex;
      justify-content: space-between;
      line-height: 1.2;
      background: rgba(210, 210, 210, 0.5);
      color: black;

      clip-path: polygon(
        $clip 0,
        $nClip 0,
        100% $clip,
        100% 100%,
        0 100%,
        0 $clip
      );

      @media (max-width: 767px) {
        font-size: 1.5em;
      }
    }

    > div {
      padding: var(--spacing);

      h4 {
        margin: 0 0 calc(var(--spacing) / 2) 0;
      }
    }
  }

  article.portfolio-item,
  article.blog-item {
    display: flex;
    flex-direction: column;

    h3 {
      min-height: 200px;
      background-size: cover;
      background-position: center;
      padding: 0;
      color: white;
      text-shadow: 1px 1px var(--accent-color);
      position: relative;

      &,
      div {
        display: flex;
      }

      div {
        flex: 1 1 auto;
        align-items: flex-end;
        background: rgba(0, 0, 0, 0.3);
        padding: var(--spacing);
      }

      picture {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }

    > div {
      padding: 0;

      &,
      .info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .info {
        padding: var(--spacing);
        padding-bottom: calc(var(--spacing) - 7px);

        .tag {
          padding: 5px 10px;
          background: var(--accent-color);
          color: white;
          clip-path: polygon(0 50%, 15px 0, 100% 0, 100% 100%, 15px 100%);
          position: relative;
          display: inline-flex;
          align-items: center;
          margin: 0 7px 7px 0;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;

          &:before {
            content: '';
            width: 4px;
            height: 4px;
            border: 1px solid white;
            display: inline-block;
            border-radius: 100%;
            margin-right: 5px;
          }
        }
      }

      .buttons {
        display: flex;
        justify-content: space-between;

        a,
        span {
          padding: var(--spacing);
          width: 45%;
          text-align: center;
        }

        a {
          background: var(--accent-color);
          box-sizing: border-box;
          color: white;
          border: none;

          &:first-child {
            clip-path: polygon(
              0 0,
              calc(100% - var(--spacing)) 0,
              100% var(--spacing),
              100% 100%,
              var(--spacing) 100%,
              0 calc(100% - var(--spacing)),
              0 0
            );
          }

          &:last-child:not(:only-child) {
            clip-path: polygon(
              var(--spacing) 0,
              100% 0,
              100% calc(100% - var(--spacing)),
              calc(100% - var(--spacing)) 100%,
              0 100%,
              0 var(--spacing)
            );
          }
        }

        span {
          display: inline-block;
          font-style: italic;
        }
      }
    }
  }
}
</style>
