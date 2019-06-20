<template>
  <div class="home">
    <app-section type="Portfolio" :header="false"/>
  </div>
</template>

<script>
import AppSection from '~/components/AppSection.vue';

export default {
  head: {
    titleTemplate: 'Portfolio :: %s',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Portfolio :: Luis Augusto'
      }
    ]
  },
	components: {
		AppSection
	}
};
</script>
