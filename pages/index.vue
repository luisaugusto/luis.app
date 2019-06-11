<template>
  <div class="home">
    <app-section type="Description" :header="false" />
    <app-section type="Blog" />
    <app-section type="Skillsets" />
    <app-section type="Portfolio" />
    <app-section type="Contact" />
  </div>
</template>

<script>
import AppSection from '../components/AppSection.vue';

console.log('fullenv -');
console.log(process.env);
console.log('hi');
console.log('id ' + process.env.CONTENTFUL_ACCESS_TOKEN);

export default {
	components: {
		AppSection
	}
};
</script>
