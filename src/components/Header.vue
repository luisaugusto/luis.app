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
        <span>{{currentSubtitle.text}}<span :class="{flashingCursor}">_</span></span>
      </div>
      <nav>
        <ul>
          <li>Home</li>
          <li>Capabilities</li>
          <li>Portfolio</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      angle: 0,
      titles: [
        {
          title: 'Web Developer',
          background: 'https://picsum.photos/1920/1080/?random'
        },
        {
          title: 'Photographer',
          background: 'https://picsum.photos/1920/1200/?random'
        },
        {
          title: 'Dog Lover',
          background: 'https://picsum.photos/1600/1200/?random'
        },
        {
          title: 'Adventurer',
          background: 'https://picsum.photos/1600?random'
        }
      ],
      currentSubtitle: {
        index: undefined,
        text: ''
      },
      flashingCursor: true
    };
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
  mounted() {
    this.adjustAngle();

    //The subtitle index is set on mounted so that the image
    //doesn't start with the class and bypass the animation
    this.currentSubtitle.index = 0;
    this.typeSubtitles(this.titles[0].title);
    document.addEventListener('scroll', this.adjustAngle);
  },
  destroyed() {
    document.removeEventListener('scroll', this.adjustAngle);
  }
};
</script>

<style lang="scss">
header {
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.3));
  color: #efefef;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);

  > div {
    height: 50vh;
    min-height: 500px;
    position: relative;

    .backgrounds {
      height: 100%;
      overflow: hidden;
      filter: brightness(75%);

      &,
      img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      img {
        opacity: 0;
        transform-origin: center;
        transition: opacity 0.5s, transform 0s 0.5s;

        &.active {
          opacity: 1;
          transform: scale(1.05);
          transition: opacity 0.5s, transform 12s;
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
        margin: 0;
        padding: 0;
        list-style: none;
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
