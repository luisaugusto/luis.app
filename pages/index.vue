<template>
  <div class="home">
    <app-section type="Description" :header="false" />
    <app-section type="Blog" custom-header="Latest Posts" :latest-posts-only="true"/>
    <app-section type="Skillsets" />
  </div>
</template>

<script>
import AppSection from '../components/AppSection.vue';

export default {
	components: {
		AppSection
	}
};
</script>
