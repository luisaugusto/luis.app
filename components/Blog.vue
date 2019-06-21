<template>
  <div class="col-3 blog-posts" >
    <a
      v-for="post in posts"
      :key="post.id"
      v-observe-visibility="{
        callback: displayPost,
        once: true
      }"
      :href="'/blog/' + post.slug"
    >
      <picture>
        <source
          :srcset="post.featuredImage.fields.file.url"
          type="image/webp"
        >
        <source
          :srcset="post.featuredImageJPG.fields.file.url"
          type="image/jpeg"
        >
        <img
          :src="post.featuredImageJPG.fields.file.url"
          :alt="post.title"
        >
      </picture>
      <article class="blog-item">
        <div class="info">
          <h4>{{ post.title }}</h4>
          <p>
            <em>{{ post.postDate }}</em>
          </p>
          <p>{{ post.description }}</p>
        </div>
      </article>
    </a>

    <div class="align-right">
      <button>
        <nuxtLink to="/blog">
          Read More
        </nuxtLink>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {
    displayPost(isVisible, entry) {
      if (isVisible) {
        setTimeout(function() {
          entry.target.className = 'display';
        }, 300);
      }
    }
  }
};
</script>

<style lang="scss">
.blog-posts {
  grid-template-columns: repeat(2, minmax(360px, 1fr));
  grid-row-gap: calc(var(--spacing) * 2);

  @media (max-width: 810px) {
    grid-template-columns: 1fr;
  }

  > a {
    display: grid;
    grid-template-columns: auto repeat(3, 100px);
    font-weight: normal;
    opacity: 0;
    border: none;

    &:first-child {
      grid-column: 1/-1;
    }

    picture, article {
      position: relative;
      transition: all 0.5s;
      opacity: 0;
    }

    picture {
      width: 100%;
      grid-row: 1/3;
      grid-column: 1/4;
      left: calc(var(--spacing) * -1);

      img {
        width: 100%;
        box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.75);
      }
    }

    article {
      grid-row: 2/4;
      grid-column: 2/5;
      left: var(--spacing);
      top: 0;

      .info {
        justify-content: flex-start;
      }
    }

    &.display {
      opacity: 1;

      picture, article {
        left: 0;
        opacity: 1;
      }

      &:hover {
        picture {
          left: calc(var(--spacing) / 2);
          filter: grayscale(1);
        }

        article {
          left: calc(var(--spacing) / -2);
        }
      }
    }
  }
}
</style>
