<template>
  <div v-if="skillsets.length > 0" class="col-3" v-observe-visibility="{
        callback: displaySkills,
        once: true
      }">
    <article v-for="skillset in skillsets" class="skillset" :key="skillset.id" >
      <h3>{{ skillset.title }}<font-awesome-icon :icon="skillset.icon" /></h3>
      <div>
        <div
          v-for="skills in skillset.skillsetGroups"
          :key="skillset.id + skills.sys.id"
        >
          <h4>{{ skills.fields.title }}</h4>
          <ul>
            <li
              v-for="(skill, index) in skills.fields.skills"
              :key="skillset.id + skills.sys.id + index"
            >
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </article>
    <div class="align-right">
      <button>
        <nuxtLink to="/portfolio">
          View Portfolio
        </nuxtLink>
      </button>
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

export default {
	data() {
		return {
			skillsets: []
		};
  },
  methods: {
    displaySkills(isVisible, entry) {
      if (isVisible) {
        setTimeout(function() {
          entry.target.className += ' display';
        }, 300);
      }
    }
  },
	beforeMount() {
		client
			.getEntries({
				content_type: 'skillsets',
				order: 'fields.order'
			})
			.then(({ items }) => {
				this.skillsets = items.map(({ fields, sys }) => {
					return { ...fields, ...sys };
				});
			});
	}
};
</script>

<style lang="scss" scoped>
div.col-3 {
  &, article {
    opacity: 0;
    transition: all 0.5s;
  }

  article {
    position: relative;
    top: calc(var(--spacing) * 2);
  }

  @for $i from 1 through 3 {
    article:nth-child(#{$i}) {
      transition-delay: calc(#{$i} * .1s);
    }
  }

  &.display {
    opacity: 1;

    article {
      opacity: 1;
      top: 0;
    }
  }
}
</style>
