<template>
  <div v-if="portfolio.length > 0" class="col-3" >
    <article class="dev-workflow" v-observe-visibility="{
        callback: displaySection,
        once: true
      }">
      <h3>Development Workflow <font-awesome-icon icon="layer-group" /></h3>
      <div v-html="workflow" />
    </article>
    <article v-for="site in portfolio" class="portfolio-item" :key="site.id" v-observe-visibility="{
        callback: displaySection,
        once: true
      }">
      <h3>
        <picture>
          <source
            :srcset="site.image.fields.file.url"
            type="image/webp"
          />
          <source
            :srcset="site.imageFallback.fields.file.url"
            type="image/jpeg"
          />
          <img :src="site.imageFallback.fields.file.url" :alt="site.title" />
        </picture>
        <div>{{ site.title }}</div>
      </h3>
      <div>
        <div class="info">
          <p>{{ site.description }}</p>
          <div class="tags">
            <span v-for="(tag, i) in site.tags" class="tag" :key="tag + i" >{{
                    tag
            }}</span>
          </div>
        </div>
        <div class="buttons">
          <a
            v-if="site.repositoryUrl"
            target="_blank"
            rel="noreferrer"
            :href="site.repositoryUrl"
            >View Repo</a
          >
          <a
            v-if="site.liveUrl"
            target="_blank"
            :href="site.liveUrl"
            rel="noreferrer"
            >View Site</a
          >
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
	data() {
		return {
      portfolio: [],
      workflow: '',
		};
  },
  methods: {
    displaySection(isVisible, entry) {
      console.log(entry);
      if (isVisible) {
        setTimeout(function() {
          entry.target.setAttribute('display', true);
        }, 200);
      }
    }
  },
	beforeMount() {
		client
			.getEntries({
				content_type: 'portfolio',
				order: 'fields.order'
			})
			.then(({ items }) => {
				this.portfolio = items.map(({ fields, sys }) => {
					return { ...fields, ...sys };
				});
      });

    client
			.getEntries({
				content_type: 'siteSettings'
			})
			.then(({ items }) => {
				this.workflow = documentToHtmlString(
					items[0].fields.developmentWorkflow
				);
			});
	}
};
</script>

<style lang="scss">
.dev-workflow {
  grid-column: 1/-1;

  h3 {
    align-items: center;

    svg {
      margin-right: 15px;
    }
  }
}

article.portfolio-item {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  justify-self: center;

  h3 {
    min-height: 200px;
    background-size: cover;
    background-position: center;
    padding: 0;
    color: white;
    text-shadow: 1px 1px var(--accent-color);
    position: relative;

    &,
    div {
      display: flex;
    }

    div {
      flex: 1 1 auto;
      align-items: flex-end;
      background: rgba(0, 0, 0, 0.3);
      padding: var(--spacing);
    }

    picture {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  > div {
    padding: 0;

    &,
    .info {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .info {
      padding: var(--spacing);
      padding-bottom: calc(var(--spacing) - 7px);

      .tag {
        padding: 5px 10px;
        background: var(--accent-color);
        color: white;
        clip-path: polygon(0 50%, 15px 0, 100% 0, 100% 100%, 15px 100%);
        position: relative;
        display: inline-flex;
        align-items: center;
        margin: 0 7px 7px 0;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;

        &:before {
          content: "";
          width: 4px;
          height: 4px;
          border: 1px solid white;
          display: inline-block;
          border-radius: 100%;
          margin-right: 5px;
        }
      }
    }

    .buttons {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      grid-gap: var(--spacing);

      a:only-child {
        grid-column: 2/3;
      }

      a,
      span {
        padding: var(--spacing);
        text-align: center;
      }

      a {
        background: var(--accent-color);
        box-sizing: border-box;
        color: white;
        border: none;

        &:first-child {
          clip-path: polygon(
            0 0,
            calc(100% - var(--spacing)) 0,
            100% var(--spacing),
            100% 100%,
            var(--spacing) 100%,
            0 calc(100% - var(--spacing)),
            0 0
          );
        }

        &:last-child {
          clip-path: polygon(
            var(--spacing) 0,
            100% 0,
            100% calc(100% - var(--spacing)),
            calc(100% - var(--spacing)) 100%,
            0 100%,
            0 var(--spacing)
          );
        }
      }

      span {
        display: inline-block;
        font-style: italic;
      }
    }
  }
}
</style>
