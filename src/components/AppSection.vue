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
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
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
}
</style>
