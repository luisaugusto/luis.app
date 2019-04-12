<template>
  <div class="skills">
    <div class="col-3" v-if="skillsets.length > 0">
      <article
        class="skillset"
        v-for="skillset in skillsets"
        :key="skillset.id"
      >
        <h3>
          {{ skillset.title }}<font-awesome-icon :icon="skillset.icon" />
        </h3>
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
    </div>

    <article>
      <h3>Development Workflow <font-awesome-icon icon="layer-group" /></h3>
      <div>
        <p>
          The primary stack I like to build on is known as
          <a href="https://jamstack.org/">JAMstack</a>, which is a modern web
          development architecture based on client-side
          <strong>JavaScript</strong>, reusable <strong>APIs</strong>, and
          prebuilt <strong>Markup</strong>. This allows for me to build websites
          and applications with better performance, higher security, and lower
          cost of scaling.
        </p>

        <p>
          I will typically reach for
          <a href="https://vuejs.org/">Vue.js</a> to begin each project and add
          on additional functionality based on the scope. For projects that
          require optimal performance and SEO,
          <a href="https://nuxtjs.org/">Nuxt.js</a> or
          <a href="https://gridsome.org/">Gridsome</a> can be used to generate
          pre-rendered (Static) or server side rendered (SSR) applications. For
          large sites with many nested components and data traversal, I will
          include <a href="https://vuex.vuejs.org/">Vuex</a> as the central
          state management library.
        </p>

        <p>
          Content management is done through headless CMS platforms such as
          <a href="https://contentful.com/">Contentful</a> or
          <a href="https://prismic.io/">Prismic</a>, where I am able to fetch
          the data through APIs into the application. Ecommerce can be added
          through APIs as well, and I have worked with integrating
          <a href="http://shopify.com/">Shopify</a> and
          <a href="https://snipcart.com/">Snipcart</a> into my applications.
        </p>

        <p>
          Aside from JAMstack, I also develop many websites on the LAMP Stack
          (<strong>Linux</strong>, <strong>Apache</strong>,
          <strong>MySQL</strong>, <strong>PHP</strong>). I primarily use
          <a href="https://wordpress.org/">Wordpress</a> or
          <a href="https://www.concrete5.org/">Concrete5</a> as the CMS and
          develop websites using
          <a href="https://www.docker.com/">Docker Containers</a> for the best
          security and reliability.
        </p>
      </div>
    </article>
  </div>
</template>

<script>
import { entries } from '../main.js';

export default {
  data() {
    return {
      skillsets: []
    };
  },
  beforeMount() {
    entries('skillsets').then(({ items }) => {
      this.skillsets = items.map(({ fields, sys }) => {
        return { ...fields, ...sys };
      });
    });
  }
};
</script>

<style lang="scss" scoped></style>
