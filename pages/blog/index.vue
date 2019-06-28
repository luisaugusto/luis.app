<template>
  <div class="blog">
    <app-section type="Blog" :header="false"/>
  </div>
</template>

<script>
import AppSection from '~/components/AppSection.vue';
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

export default {
  async fetch ({ store, params }) {
    let { items } = await client.getEntries({
      content_type: 'blogPost',
      order: 'fields.postDate'
    });

    store.commit('setPosts', items);
  },
  head: {
    titleTemplate: 'Blog :: %s',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Blog :: Luis Augusto'
      },
      {
				hid: 'og:url',
				property: 'og:url',
				content: 'https://luis.codes/blog'
      },
    ],
    link: [
      { rel: 'canonical', href: 'https://luis.codes/blog' }
    ]
  },
	components: {
		AppSection
	}
};
</script>
