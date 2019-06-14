<template>
  <header ref="header">
    <div
      :style="{
        clipPath: `polygon(0 0, 100% 00%, 100% 100%, 0 ${angle}%)`,
        '-webkit-clip-path': `polygon(0 0, 100% 00%, 100% 100%, 0 ${angle}%)`
      }"
    >
      <div class="backgrounds">
        <picture
          v-for="(img, i) in titles"
          :key="img.title"
          :class="{ active: currentSubtitle.index == i }"
        >
          <source
            :srcset="img.background"
            type="image/webp"
            @load="firstTitleLoaded = true"
          >
          <source
            :srcset="img.fallback"
            type="image/jpeg"
            @load="firstTitleLoaded = true"
          >
          <img
            :src="img.fallback"
            :alt="img.title"
            @load="firstTitleLoaded = true"
          >
        </picture>
      </div>
      <div class="page-title" :style="{ height: angle + 20 + '%' }">
        <h1>Luis Augusto</h1>
        <div>
          <span class="spacer">_</span>
          <span>{{ currentSubtitle.text }}</span>
          <span :class="{ flashingCursor }">_</span>
        </div>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <nuxtLink to="/">
            Home
          </nuxtLink>
        </li>
        <li>
          <nuxtLink to="/portfolio">
            Portfolio
          </nuxtLink>
        </li>
        <li>
          <nuxtLink to="/blog">
            Blog
          </nuxtLink>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

export default {
	data() {
		return {
			angle: 50,
			titles: [],
			firstTitleLoaded: false,
			currentSubtitle: {
				index: undefined,
				text: ''
			},
			flashingCursor: true,
			sections: ['Blog', 'Skillsets', 'Portfolio', 'Contact']
		};
	},
	watch: {
		firstTitleLoaded() {
			this.currentSubtitle.index = 0;
			this.typeSubtitles(this.titles[0].title);
		}
	},
	beforeMount() {
		client
			.getEntries({
				content_type: 'subheaders',
				order: 'fields.order'
			})
			.then(({ items }) => {
				this.titles = items.map(({ fields }) => {
					return {
						title: fields.title,
						background: fields.image.fields.file.url,
						fallback: fields.imageFallback.fields.file.url
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
	},
	methods: {
		adjustAngle() {
			const headerHeight = this.$refs.header.clientHeight;
			this.angle =
        Math.floor(
        	Math.min(50 + window.scrollY / (headerHeight / 50), 100) * 100
        ) / 100;
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
	}
};
</script>

<style lang="scss" scoped>
header {
  filter: drop-shadow(0px 5px 0px var(--accent-color));
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  position: relative;
  color: white;

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

      picture {
        opacity: 0;
        transition: opacity 0.5s;

        img {
          object-fit: cover;
          left: 50%;
          transform: translateX(-50%);
          transform-origin: center;
          transition: transform 0s 0.5s;
        }

        &.active {
          opacity: 1;

          img {
            transform: scale(1.025) translateX(-50%);
            transition: transform 15s;
          }
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

        + div {
          font-family: "Major Mono Display";
          font-size: 2.5em;
          display: flex;

          .spacer {
            opacity: 0;
          }

          .flashingCursor {
            animation: flash 1s step-end infinite;
          }
        }

        @media (max-width: 500px) {
          font-size: 13vw;

          + div {
            font-size: 7vw;
          }
        }
      }
    }
  }
}

nav {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;

  ul {
    margin: 0;
    padding: var(--spacing);
    list-style: none;
    display: grid;
    grid-gap: var(--spacing);
    grid-auto-flow: column;

    li {
      margin-bottom: 0;

      a {
        display: block;
        border-top: 1px solid white;
        border-bottom: none;
        padding: 10px 10px 0 10px;
        transition: all 0.1s ease-out;
        position: relative;
        opacity: 1;
        font-weight: normal;
        color: white;
        text-decoration: none;

        &:hover,
        &.active {
          border-top-width: 3px;
          padding-top: 8px;
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
