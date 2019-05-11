<template>
  <div class="col-3" v-if="skillsets.length > 0">
    <article class="skillset" v-for="skillset in skillsets" :key="skillset.id">
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
    <article class="dev-workflow">
      <h3>Development Workflow <font-awesome-icon icon="layer-group" /></h3>
      <div v-html="workflow"></div>
    </article>
  </div>
</template>

<script>
import { entries } from '../main.js';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  data() {
    return {
      skillsets: [],
      workflow: ''
    };
  },
  beforeMount() {
    entries('skillsets').then(({ items }) => {
      this.skillsets = items.map(({ fields, sys }) => {
        return { ...fields, ...sys };
      });
    });

    entries('siteSettings').then(({ items }) => {
      this.workflow = documentToHtmlString(items[0].fields.developmentWorkflow);
    });
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 1025px) {
  .dev-workflow {
    grid-column: span 3;
  }
}
</style>
