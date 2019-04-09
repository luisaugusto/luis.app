<template>
  <section :id="type">
    <h2 v-if="header">{{ type }}</h2>

    <component :is="type"></component>
  </section>
</template>

<script>
import Description from './Description.vue';
import Skillsets from './Skillsets.vue';

export default {
  props: {
    type: String,
    header: {
      default: true,
      type: Boolean
    }
  },
  components: {
    Description,
    Skillsets
  }
};
</script>

<style lang="scss">
section {
  margin: var(--spacing) 0;

  h2 {
    font-size: 3em;
    font-weight: normal;
    padding-left: var(--spacing);
    border-left: 5px solid var(--accent-color);
    margin: 0;
    text-transform: capitalize;

    &:first-letter {
      font-weight: bold;
    }
  }

  .col-3 {
    display: grid;
    grid-gap: var(--spacing);
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 767px) {
      grid-template-columns: auto;
    }
  }

  article {
    position: relative;
    margin: var(--spacing) 0;
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
