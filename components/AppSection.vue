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

    <component :is="type"/>
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
