<template>
  <div>
    <header ref="header">
      <div
        :style="{ clipPath: `polygon(0 0, 100% 00%, 100% 100%, 0 ${angle}%)` }"
      >
        <div class="backgrounds">
          <img
            v-for="({ title, background }, i) in titles"
            :src="background"
            :key="title"
            :alt="title"
            :class="{ active: currentSubtitle.index == i }"
            @load="firstTitleLoaded = true"
          />
        </div>
        <div class="page-title" :style="{ height: angle + '%' }">
          <h1>Luis Augusto</h1>
          <span
            ><span class="spacer">_</span>{{ currentSubtitle.text
            }}<span :class="{ flashingCursor }">_</span></span
          >
        </div>
      </div>
    </header>
    <nav
      v-for="i in 2"
      :key="'nav' + i"
      :class="{ hide: navTransition && i === 1, bg: navTransition && i === 2 }"
    >
      <ul>
        <li>
          <a
            href="#"
            v-scroll-to="'#app'"
            :class="{
              active: activeSections.length === 0
            }"
            >Home</a
          >
        </li>
        <li v-for="(section, i) in sections" :key="section + i">
          <a
            href="#"
            v-scroll-to="'#' + section"
            :class="{
              active: activeSections[0] == section
            }"
            >{{ section }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { entries, EventBus } from '../main.js';

export default {
  data() {
    return {
      angle: 0,
      titles: [],
      firstTitleLoaded: false,
      currentSubtitle: {
        index: undefined,
        text: ''
      },
      flashingCursor: true,
      activeSections: [],
      sections: ['Skillsets', 'Portfolio', 'Blog', 'Contact']
    };
  },
  watch: {
    firstTitleLoaded() {
      this.currentSubtitle.index = 0;
      this.typeSubtitles(this.titles[0].title);
    }
  },
  computed: {
    navTransition() {
      return this.angle == 100 ? true : false;
    }
  },
  methods: {
    adjustAngle() {
      const headerHeight = this.$refs.header.clientHeight;
      this.angle = Math.min(50 + window.scrollY / (headerHeight / 50), 100);
    },
    typeSubtitles(str, cur = 0, del = false) {
      //Checks if the word is finished being deleted while in delete mode
      if (cur === -1 && del) {
        //Get the index of the current string
        let strIndex = this.titles.indexOf(
          this.titles.find(({ title }) => title == str)
        );

        //Check if the current string is the last item in the array
        //If so, loop back to beginning of array. Otherwise use next item in array
        if (++strIndex == this.titles.length) strIndex = 0;
        this.currentSubtitle.index = strIndex;
        this.typeSubtitles(this.titles[strIndex].title);
        return;
      }

      const vm = this;
      //Checks if the word is finished being written out,
      //then waits 5 seconds before deleting it and typing a new word
      if (cur == str.length) {
        this.flashingCursor = true;

        setTimeout(function() {
          vm.typeSubtitles(str, --cur, true);
        }, 5000);
      } else {
        this.flashingCursor = false;

        if (del) this.currentSubtitle.text = str.substring(0, cur);
        else this.currentSubtitle.text += str[cur];

        setTimeout(function() {
          if (del) vm.typeSubtitles(str, --cur, true);
          else vm.typeSubtitles(str, ++cur);
        }, 50);
      }
    }
  },
  beforeMount() {
    entries('subheaders', 'fields.order').then(({ items }) => {
      this.titles = items.map(({ fields }) => {
        return {
          title: fields.title,
          background: fields.image.fields.file.url
        };
      });
    });
  },
  mounted() {
    this.adjustAngle();
    document.addEventListener('scroll', this.adjustAngle);

    EventBus.$on('setActiveSection', section => {
      if (section.type == 'Description') return;

      if (section.isVisible && this.activeSections.indexOf(section.type) < 0) {
        this.activeSections.unshift(section.type);
      }

      if (
        !section.isVisible &&
        this.activeSections.indexOf(section.type) >= 0
      ) {
        this.activeSections = this.activeSections.filter(
          item => item != section.type
        );
      }
    });
  },
  destroyed() {
    document.removeEventListener('scroll', this.adjustAngle);
    EventBus.$off('setActiveSection');
  }
};
</script>

<style lang="scss" scoped>
header,
nav {
  color: white;
}

header {
  z-index: 2;
  filter: drop-shadow(0px 5px 0px var(--accent-color));
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  position: relative;

  > div {
    height: 50vh;
    min-height: 480px;
    position: relative;

    .backgrounds {
      overflow: hidden;
      filter: brightness(75%);
      left: 0;
      background-color: #999;

      &,
      img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
      }

      img {
        object-fit: cover;
        left: 50%;
        opacity: 0;
        transform: translateX(-50%);
        transform-origin: center;
        transition: opacity 0.5s, transform 0s 0.5s;

        &.active {
          opacity: 1;
          transform: scale(1.025) translateX(-50%);
          transition: opacity 0.5s, transform 15s;
        }
      }
    }

    .page-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      h1 {
        font-weight: normal;
        margin: 0;
        font-size: 4em;

        + span {
          font-family: 'Major Mono Display';
          font-size: 2.5em;

          .spacer {
            opacity: 0;
          }

          .flashingCursor {
            animation: flash 1s step-end infinite;
          }
        }

        @media (max-width: 500px) {
          font-size: 13vw;

          + span {
            font-size: 7vw;
          }
        }
      }
    }
  }
}

nav {
  position: fixed;
  top: 0;
  right: 0;
  padding: 15px;
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  mix-blend-mode: color-dodge;

  &.hide {
    opacity: 0;
    visibility: hidden;
  }

  ul {
    margin: 0 -15px;
    padding: 0;
    list-style: none;
    display: flex;

    li {
      margin-bottom: 0;

      a {
        display: block;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-bottom: none;
        padding: 10px 10px 0 10px;
        margin: 0 15px;
        transition: all 0.1s ease-out;
        position: relative;
        opacity: 1;

        &:hover,
        &.active {
          border-top: 3px solid white;
          padding-top: 8px;
        }
      }
    }
  }
}

nav + nav {
  $font-color: black;
  color: $font-color;
  z-index: 1;
  mix-blend-mode: difference;
  border-bottom: 3px solid var(--accent-color);
  transition: background 0.5s;

  &.bg {
    background: rgba(255, 255, 255, 0.5);
  }

  ul li a {
    border-color: $font-color;

    &:hover,
    &.active {
      border-top: 3px solid $font-color;
    }
  }
}

@supports (-webkit-backdrop-filter: blur(1px)) OR (backdrop-filter: blur(1px)) {
  nav + nav {
    mix-blend-mode: normal;
  }

  nav + nav.bg {
    backdrop-filter: blur(5px);
    background: none;
  }
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
