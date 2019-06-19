<template>
  <div v-if="skillsets.length > 0" class="col-3" >
    <article v-for="skillset in skillsets" class="skillset" :key="skillset.id" v-observe-visibility="{
        callback: displaySkill,
        once: true
      }">
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
    displaySkill(isVisible, entry) {
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
