<template>
  <div>
    <section class="post" v-html="markdown"></section>
    <section class="comments">
      <vue-disqus shortname="luis-codes" :identifier="post.slug" :url="'https://luis.codes/blog/' + post.slug"></vue-disqus>
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
      titleTemplate: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https:' + this.image
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://luis.codes/blog/' + this.post.slug
        },
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https://luis.codes/blog/' + this.post.slug }
      ]
    };
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    post() {
      return this.$store.state.post;
    },
    markdown() {
      return marked(this.post.content);
    },
    image() {
      return this.post.featuredImageJPG.fields.file.url;
    }
  },
  methods: {
		toggleHeader(isVisible) {
			this.visible = isVisible;
		}
	},
  async fetch({store, params}) {
    let { items } = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': params.slug,
      limit: 1
    });

    store.commit('setPost', items[0].fields);
  }
};
</script>
<style lang="scss">
.page .post,
.page .comments {
  max-width: 800px;
  margin: calc(var(--spacing) * 2) auto;

  &.comments {
    padding-top: calc(var(--spacing) * 2);
  }

  h2 {
    clip-path: none;
    padding-left: var(--spacing);

    &::first-letter {
      font-weight: bold;
    }
  }

  iframe[src*='codepen'] {
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
