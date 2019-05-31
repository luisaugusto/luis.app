<template>
  <div class="col-3" v-if="portfolio.length > 0">
    <article class="portfolio-item" v-for="site in portfolio" :key="site.id">
      <h3>
        <picture>
          <source :srcset="site.image.fields.file.url" type="image/webp" />
          <source
            :srcset="site.imageFallback.fields.file.url"
            type="image/jpeg"
          />
          <img :src="site.imageFallback.fields.file.url" :alt="site.title"/>
        </picture>
        <div>{{ site.title }}</div>
      </h3>
      <div>
        <div class="info">
          <p>{{ site.description }}</p>
          <div class="tags">
            <span class="tag" v-for="(tag, i) in site.tags" :key="tag + i">{{
              tag
            }}</span>
          </div>
        </div>
        <div class="buttons">
          <a target="_blank" v-if="site.liveUrl" :href="site.liveUrl" rel="noreferrer"
            >View Site</a
          >
          <a
            target="_blank" rel="noreferrer"
            v-if="site.repositoryUrl"
            :href="site.repositoryUrl"
            >View Repo</a
          >
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { entries } from '../main.js';

export default {
  data() {
    return {
      portfolio: []
    };
  },
  beforeMount() {
    entries('portfolio', 'fields.order').then(({ items }) => {
      this.portfolio = items.map(({ fields, sys }) => {
        return { ...fields, ...sys };
      });
    });
  }
};
</script>
