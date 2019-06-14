<template>
  <div id="app">
    <app-header />
    <nuxt class="page" />
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';

export default {
	components: {
		AppHeader
	}
};
</script>

<style lang="scss">
.page {
  max-width: 1200px;
  margin: auto;
  padding: 0 var(--spacing);
  box-sizing: border-box;
}
</style>
