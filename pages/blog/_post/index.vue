<template>
  <div>
    <section class="post" v-if="post.content">
      <h1 v-observe-visibility="{
          callback: toggleHeader,
          once: true
        }"
        :class="{ visible }">
        <span>{{ post.title }}</span>
      </h1>
      <p><em>{{ formattedDate }}</em></p>

      <div v-html="markdown"></div>
    </section>
  </div>
</template>
<script>
import { createClient } from '~/plugins/contentful.js';
const client = createClient();
const marked = require('marked');

export default {
  head() {
    return {
      titleTemplate: this.post.title + ' :: %s',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.image
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.title + ' :: Luis Augusto'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.description
        }
      ],
    };
  },
  data() {
    return {
      post: {},
      visible: false
    };
  },
  computed: {
    formattedDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date  = new Date(this.post.postDate);
      return date.toLocaleDateString('en-US', options);
    },
    markdown() {
      return marked(this.post.content);
    },
    image() {
      return this.post.featuredImageJPG ? this.post.featuredImageJPG.fields.file.url : '';
    }
  },
  methods: {
		toggleHeader(isVisible) {
			this.visible = isVisible;
		}
	},
  beforeMount() {
    client.getEntries({
      content_type: 'blogPost',
      'fields.slug': $nuxt.$route.params.slug,
      limit: 1
    })
    .then(blogPost => {
      this.post = blogPost.items[0].fields;
      console.log(this.post);
    });
  }
};
</script>
<style lang="scss">
.page .post {
  max-width: 800px;
  margin: calc(var(--spacing) * 2) auto;

  h2 {
    clip-path: none;
    border-left: none;
    padding-left: 0;
    margin: calc(var(--spacing)) 0;
    font-size: 2.5em;
    font-weight: bold;
  }

  iframe {
    margin: calc(var(--spacing)) 0;
  }

  hr {
    border: none;
    margin: 0;
    font-size: 5em;
    text-align: center;
    filter: drop-shadow(2px 2px 0px var(--accent-color));

    &:before {
      content: '• • •';
    }
  }

  pre, code {
    background: #333;
    color: yellow;
    padding: 3px 5px;
    border-radius: 3px;
    overflow-x: scroll;

    code {
      background: none;
      padding: 0;
    }
  }

  pre {
    padding: 10px;
  }

  ul {
    list-style: circle;
    padding-left: 40px;
  }
}
</style>
