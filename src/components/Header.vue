<template>
  <header ref="header">
    <div :style="{clipPath: `polygon(0 0, 100% 00%, 100% 100%, 0 ${angle}%)`}">
      <div class="backgrounds">
        <img v-for="({title, background}, i) in titles" 
        :src="background" :key="title" :alt="title" 
        :class="{active: currentSubtitle.index == i}"/>
      </div>
      <div class="page-title" :style="{height: angle + '%'}">
        <h1>Luis Augusto</h1>
        <span><span class="spacer">_</span>{{currentSubtitle.text}}<span :class="{flashingCursor}">_</span></span>
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Capabilities</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { entries } from '../main.js';

export default {
  data() {
    return {
      angle: 0,
      titles: [],
      currentSubtitle: {
        index: undefined,
        text: ''
      },
      flashingCursor: true
    };
  },
  watch: {
    titles() {
      const vm = this;
      setTimeout(function() {
        vm.currentSubtitle.index = 0;
        vm.typeSubtitles(vm.titles[0].title);
      }, 1);
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
  beforeCreate() {
    entries('subheaders', 'fields.order').then(entries => {
      this.titles = entries.items.map(({ fields }) => {
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
  },
  destroyed() {
    document.removeEventListener('scroll', this.adjustAngle);
  }
};
</script>

<style lang="scss">
header {
  filter: drop-shadow(0px 5px 0px var(--accent-color));
  color: #efefef;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);

  > div {
    height: 50vh;
    min-height: 480px;
    position: relative;

    .backgrounds {
      overflow: hidden;
      filter: brightness(75%);
      left: 0;

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
          transform: scale(1.05) translateX(-50%);
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
      }
    }

    nav {
      position: absolute;
      top: 0;
      right: 0;
      padding: 15px;

      ul {
        margin: 0 -15px;
        padding: 0;
        list-style: none;
        display: flex;

        li a {
          display: block;
          border-top: 1px solid rgba(255, 255, 255, 0.5);
          padding: 10px;
          margin: 0 15px;
          transition: all 0.2s ease-out;
          position: relative;

          &:hover {
            border-top: 3px solid white;
            padding-top: 8px;
          }
        }
      }
    }
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
