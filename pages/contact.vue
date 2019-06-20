<template>
  <div class="contact">
    <app-section type="Contact" :header="false"/>
  </div>
</template>

<script>
import AppSection from '~/components/AppSection.vue';

export default {
  head: {
    titleTemplate: 'Contact :: %s',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Contact :: Luis Augusto'
      }
    ]
  },
	components: {
		AppSection
	}
};
</script>
