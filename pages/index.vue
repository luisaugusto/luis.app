<template>
  <div class="home">
    <app-section type="Description" :header="false" />
    <app-section type="Blog" custom-header="Latest Posts"/>
    <app-section type="Skillsets" />
  </div>
</template>

<script>
import AppSection from '../components/AppSection.vue';
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

export default {

	components: {
		AppSection
	}
};
</script>
