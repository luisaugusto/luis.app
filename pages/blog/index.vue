<template>
  <div class="blog">
    <app-section type="Blog" :header="false"/>
  </div>
</template>

<script>
import AppSection from '~/components/AppSection.vue';

export default {
  head: {
    titleTemplate: 'Blog :: %s',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Blog :: Luis Augusto'
      }
    ]
  },
	components: {
		AppSection
	}
};
</script>
