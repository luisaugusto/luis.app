<template>
  <section class="github">
    <Repo v-for="repo in repos" :key="repo.id" :repo="repo"></Repo>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Repo from '~/components/Repo'

export default {
  components: {
    Repo
  },
  computed: {
    repos() {
      return this.$store.state.github.repos
    }
  },
  async fetch() {
    await this.getRepos()
  },
  methods: {
    ...mapActions({
      getRepos: 'github/getRepos'
    })
  }
}
</script>

<style lang="scss" scoped>
.github {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 15px;
  margin-bottom: 30px;
}
</style>
