<template>
  <div class="home page">
    <!-- TODO: Pull data from Contentful  -->
    <section :class="['site-desc', { imgLoaded }]">
      <div>
        <img src="img.jpg" alt="Luis Augusto" @load="imgLoaded = true" />
      </div>
      <p>
        <span>I am a fullstack developer with a focus on</span>
        <span>JavaScript toolsets to deliver performant,</span>
        <span>scalable, and secure web applications.</span>
      </p>
    </section>
    <section id="capabilities">
      <h2>Capabilities</h2>
      <div class="capabilities">
        <article class="capability">
          <h3>Frontend <font-awesome-icon icon="code" /></h3>
          <hr />
          <h4>HTML5/CSS3</h4>
          <ul>
            <li>Preprocessors (LESS, SASS)</li>
            <li>Frameworks (Bootstrap, Vuetify, Materialize, Foundation)</li>
            <li>Grid and Flexbox Layouts</li>
          </ul>
          <h4>JavaScript</h4>
          <ul>
            <li>ES6+</li>
            <li>VueJS and Core Libraries</li>
            <li>jQuery</li>
            <li>Static Site Generators (Gridsome, Nuxt.js)</li>
          </ul>
        </article>
        <article class="capability">
          <h3>Backend <font-awesome-icon icon="terminal" /></h3>
          <hr />
          <h4>JavaScript</h4>
          <ul>
            <li>NodeJS</li>
            <li>Build Tools (Webpack, Parcel, Gulp)</li>
          </ul>
          <h4>PHP</h4>
          <ul>
            <li>
              CMS Development (Wordpress, Concrete5, Pimcore, Squarespace)
            </li>
            <li>
              Headless CMS Configuration (Contentful, Prismic, Sanity, Netlify
              CMS)
            </li>
            <li>LAMP Stack Configuration</li>
          </ul>
          <h4>Tools</h4>
          <ul>
            <li>Ecommerce integration (Shopify, Snipcart)</li>
            <li>Git Version Control</li>
            <li>GraphQL Data Fetching</li>
            <li>Project Management (JIRA, Trello)</li>
            <li>Docker Containers</li>
          </ul>
        </article>
        <article class="capability">
          <h3>Design <font-awesome-icon icon="drafting-compass" /></h3>
          <hr />
          <h4>Tools</h4>
          <ul>
            <li>Adobe Photoshop</li>
            <li>Adobe Illustrator</li>
          </ul>
          <h4>Techniques</h4>
          <ul>
            <li>UI/UX Transitions &amp; Animation</li>
            <li>SVG Animation</li>
          </ul>
        </article>
      </div>

      <article>
        <h3>Development Workflow <font-awesome-icon icon="layer-group" /></h3>
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
          I will typically reach for <a href="https://vuejs.org/">Vue.js</a> to
          begin each project and add on additional functionality based on the
          scope. For projects that require optimal performance and SEO,
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
      </article>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgLoaded: false
    };
  }
};
</script>

<style lang="scss" scoped>
section {
  padding: 30px 0;

  &,
  article {
    box-sizing: border-box;
  }

  a {
    border-bottom: 1px dashed black;
    opacity: 0.7;
    transition: opacity 0.2s;
    font-weight: bold;

    &:hover {
      opacity: 1;
    }
  }

  article {
    position: relative;
    padding: 30px;
    margin-bottom: 30px;
    filter: drop-shadow(5px 5px 0px var(--accent-color));

    &:before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      background-image: url('https://www.transparenttextures.com/patterns/brilliant.png');

      $clip: 30px;
      $nClip: calc(100% - #{$clip});
      clip-path: polygon(
        $clip 0,
        $nClip 0,
        100% $clip,
        100% $nClip,
        $nClip 100%,
        $clip 100%,
        0 $nClip,
        0 $clip
      );
    }
  }
}

section.site-desc {
  $btd: 1s; //base-transition-delay
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;

  @media (max-width: 1169px) {
    flex-direction: column;
    text-align: center;
  }

  > div {
    flex-shrink: 0;
    margin: 0;
    width: 0px;
    transition: all $btd/2, filter $btd/2 $btd;
    overflow: hidden;
    filter: drop-shadow(0px 0px 5px transparent)
      drop-shadow(0px 0px 5px transparent);

    img {
      width: 300px;
      height: 300px;
      object-fit: cover;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      transition: all $btd/2 $btd/2;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  p {
    font-size: 2em;
    line-height: 1.5;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 10px;
    justify-items: flex-start;
    align-items: end;
    margin: 0;

    @media (max-width: 767px) {
      font-size: 4vw;
    }

    span {
      white-space: nowrap;
      height: 100%;
      max-width: 0px;
      max-height: calc(var(--font-size) * 3);
      line-height: 4;
      position: relative;
      overflow: hidden;
      transition: max-width 1s, line-height 0.75s;

      @media (max-width: 767px) {
        max-height: 6vw;
      }

      @for $i from 1 to 4 {
        &:nth-of-type(#{$i}) {
          $delay: ($i - 1) * 0.1;
          transition-delay: ($delay + $btd), (0.5s + $btd);
        }
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        background: red;
        background-image: url(https://www.transparenttextures.com/patterns/subtle-grey.png);
        width: 100%;
        height: 100%;
        transition: background-color 0.75s $btd, height 0.75s (0.5s + $btd);
        z-index: -1;
      }
    }
  }

  &.imgLoaded {
    > div {
      width: 300px;
      margin: 0 45px 0 15px;
      filter: drop-shadow(15px 0px 0 var(--accent-color))
        drop-shadow(-15px 0px 0 var(--accent-color));

      @media (max-width: 1169px) {
        margin: 0 auto 15px;
      }

      img {
        clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
      }
    }

    p span {
      max-width: 900px;
      line-height: 1.5;

      &:before {
        background-color: rgba(255, 0, 0, 0.5);
        height: 50%;
      }
    }
  }
}

div.capabilities {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
