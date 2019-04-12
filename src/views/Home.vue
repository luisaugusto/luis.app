<template>
  <div class="home">
    <app-section type="Description" :header="false" />
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
