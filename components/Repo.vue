<template>
  <a
    :href="repo.html_url"
    class="article-container"
    target="_blank"
    :title="repo.name"
  >
    <article>
      <h3>
        {{ repo.name }}
        <font-awesome-icon
          :icon="['fas', 'code-branch']"
          v-if="repo.fork"
        ></font-awesome-icon>
      </h3>
      <p>{{ repo.description }}</p>
      <div class="tags" v-if="repo.topics.length > 0">
        <span class="keyword" v-for="topic in repo.topics" :key="topic">{{
          topic
        }}</span>
      </div>
    </article>
  </a>
</template>

<script>
export default {
  props: {
    repo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/colors';
@import 'assets/articles';

article {
  padding: 15px;

  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    word-break: break-all;
    svg {
      margin-left: 1em;
    }
  }

  p {
    flex-grow: 1;

    &:last-child {
      margin: 0;
    }
  }
}
</style>
