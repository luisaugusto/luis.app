<template>
  <div class="blog">
    <app-section type="Blog" />
  </div>
</template>

<script>
import AppSection from '~/components/AppSection.vue';

export default {
  head: {
    titleTemplate: 'Blog :: %s'
  },
	components: {
		AppSection
	}
};
</script>
