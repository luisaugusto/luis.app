<template>
  <a
    class="article-container"
    :href="article.canonical_url"
    :title="article.title"
    target="_blank"
    rel="noreferrer"
  >
    <article>
      <img v-if="article.cover_image" :src="article.cover_image" alt="" />
      <h3>{{ article.title }}</h3>

      <div class="tags">
        <span v-for="tag in article.tag_list" :key="tag" class="keyword">{{
          tag
        }}</span>
      </div>

      <div class="info">
        <div class="reactions">
          <font-awesome-icon :icon="['fas', 'heart']"></font-awesome-icon>
          {{ article.positive_reactions_count }}
        </div>
        <div class="comments">
          <font-awesome-icon :icon="['far', 'comment']"></font-awesome-icon>
          {{ article.comments_count }}
        </div>
        <div class="date">
          {{ article.readable_publish_date }}
        </div>
      </div>
    </article>
  </a>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/colors';
@import 'assets/articles';

a.article-container {
  --delay: calc(var(--column-index) * 0.1s);

  max-height: 0px;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s var(--delay), max-height 0s calc(0.3s + var(--delay));

  &.active {
    --min-delay: calc((var(--total-columns) - 1) * 0.1s + 0.3s);

    max-height: 1000px;
    opacity: 1;
    transition: all 0.3s calc(var(--min-delay) + var(--delay)),
      max-height 0s calc(var(--min-delay) + var(--delay));
  }
}

article {
  img {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }

  h3 {
    flex-grow: 1;
    padding: 15px;
    margin: 0;
  }

  .tags {
    padding: 15px;
  }

  .info {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    border-top: 1px solid $light-blue;
    text-align: center;

    .fa-heart {
      color: $red;
    }

    .fa-comment {
      color: $light-blue;
    }

    > div {
      padding: 15px;

      + div {
        border-left: 1px solid $light-blue;
      }
    }
  }
}
</style>
