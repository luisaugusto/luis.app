<template>
  <div v-if="blogs.length > 0" class="col-3 blog-posts" >
    <a
      v-for="post in blogs"
      :key="post.guid"
      v-observe-visibility="{
        callback: displayPost,
        once: true
      }"
      :href="post.link"
      rel="noreferrer"
    >
      <img :src="post.thumbnail" :alt="post.title" />
      <article class="blog-item">
        <div class="info">
          <h4>{{ post.title }}</h4>
          <p>
            <em>{{ post.date }}</em>
          </p>
          <p>{{ post.description }}</p>
        </div>
      </article>
    </a>

    <div v-if="count === 3" class="align-right">
      <button>
        <nuxtLink to="/blog">
          Read More
        </nuxtLink>
      </button>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		count: {
			default: 3,
			type: Number
		}
	},
	data() {
		return {
			blogs: []
		};
	},
	watch: {
		blogs() {
			this.blogs.forEach(post => {
				const desc = post.description;
				const openP = desc.indexOf('<p>');
				const closeP = desc.indexOf('</p>');
				const firstP = desc.substring(openP, closeP);

				const el = document.createElement('div');
				el.innerHTML = firstP;
				const text = el.innerText;
				const firstSentence = text.substring(0, text.indexOf('.') + 1);

				post.description = firstSentence;

				const date = new Date(post.pubDate);
				const day = date.getDate();
				const month = date.getMonth();
				const months = [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec'
				];
				post.date = `${months[month]}  ${
					day < 10 ? 0 : ''
				}${day}, ${date.getFullYear()}`;
			});
		}
  },
  methods: {
    displayPost(isVisible, entry) {
      if (isVisible) {
        setTimeout(function() {
          entry.target.className = 'display';
        }, 300);
      }
    }
  },
	beforeMount() {
		fetch(
			'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@legendofluis'
		)
			.then(res => res.json())
			.then(data => {
				this.blogs = data.items
					.filter(post => post.thumbnail.indexOf('images') > -1)
					.slice(0, 6)
				// .reduce((acc, i, index) => {
				//   acc[index * 2] = i;
				//   acc[(index * 2) + 1] = i;
				//   return acc;
				// }, [])
					.slice(0, this.count);
			});
	}
};
</script>

<style lang="scss">
.blog-posts {
  grid-template-columns: repeat(2, minmax(360px, 1fr));
  grid-row-gap: calc(var(--spacing) * 2);

  @media (max-width: 810px) {
    grid-template-columns: 1fr;
  }

  > a {
    display: grid;
    grid-template-columns: auto repeat(3, 100px);
    font-weight: normal;
    opacity: 0;
    border: none;

    &:first-child {
      grid-column: 1/-1;
    }

    img, article {
      position: relative;
      transition: all 0.5s;
      opacity: 0;
    }

    img {
      width: 100%;
      grid-row: 1/3;
      grid-column: 1/4;
      left: calc(var(--spacing) * -1);
      box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.75);
    }

    article {
      grid-row: 2/4;
      grid-column: 2/5;
      left: var(--spacing);

      .info {
        justify-content: flex-start;
      }
    }

    &.display {
      opacity: 1;

      img, article {
        left: 0;
        opacity: 1;
      }

      &:hover {
        img {
          left: calc(var(--spacing) / 2);
          filter: grayscale(1);
        }

        article {
          left: calc(var(--spacing) / -2);
        }
      }
    }
  }
}
</style>
