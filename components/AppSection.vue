<template>
  <section
    :id="type"
  >
    <h2
      v-if="header"
      v-observe-visibility="{
        callback: toggleHeader,
        once: true
      }"
      :class="{ visible }"
    >
      <span>{{ customHeader || type }}</span>
    </h2>

    <component :is="type" />
  </section>
</template>

<script>
import Description from './Description.vue';
import Skillsets from './Skillsets.vue';
import Portfolio from './Portfolio.vue';
import Blog from './Blog.vue';
import Contact from './Contact.vue';

export default {
	components: {
		Description,
		Skillsets,
		Portfolio,
		Blog,
		Contact
	},
	props: {
		customHeader: String,
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
		}
	}
};
</script>

<style lang="scss">
section {
  margin: calc(var(--spacing) * 2) 0;

  article {
    position: relative;
    filter: drop-shadow(5px 5px 0px var(--accent-color));

    $clip: var(--spacing);
    $nClip: calc(100% - #{$clip});

    &:before {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      background-image: url(/textures/brilliant.png);

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
      font-family: "Major Mono Display";
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
    }
  }
}
</style>
