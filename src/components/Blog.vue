<template>
  <div class="col-3" v-if="blogs.length > 0">
    <article class="blog-item" v-for="post in blogs" :key="post.guid">
      <h3
        :style="{
          'background-image': `url(${post.thumbnail})`
        }"
      ></h3>
      <div>
        <div class="info">
          <h4>{{ post.title }}</h4>
          <p>{{ post.description }}</p>
        </div>
        <div class="buttons">
          <a target="_blank" :href="post.link" rel="noreferrer">Read More</a>

          <span>{{ post.date }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
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
  beforeMount() {
    fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@legendofluis'
    )
      .then(res => res.json())
      .then(data => {
        this.blogs = data.items
          .filter(post => post.thumbnail.indexOf('images') > -1)
          .slice(0, 6);
      });
  }
};
</script>

<style lang="scss" scoped>
section article.blog-item > div .info {
  justify-content: flex-start;
}
</style>
