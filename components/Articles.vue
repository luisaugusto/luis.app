<template>
  <section class="articles">
    <div class="articles-container">
      <Article
        v-for="(article, i) in articles"
        :key="article.id"
        :ref="'article-' + article.id"
        :article="article"
        :class="{
          active: i >= columns * activeRow && i < columns * activeRow + columns
        }"
      >
      </Article>
    </div>
    <div class="pagination">
      <div
        tabindex="0"
        v-for="(row, i) in rows"
        :key="row"
        :class="{ active: activeRow === i }"
        @click="activeRow = i"
      ></div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Article from '~/components/Article'

export default {
  components: {
    Article
  },
  data: () => ({
    activeRow: 0,
    columns: 1
  }),
  computed: {
    rows() {
      return Math.ceil((this.articles?.length || 0) / this.columns)
    },
    articles() {
      return this.$store.state.articles.list
    }
  },
  async fetch() {
    await this.getArticles()
  },
  methods: {
    countColumns() {
      this.columns = this.articles.reduce((acc, article) => {
        const ref = 'article-' + article.id
        const offset = this.$refs[ref][0].$el.offsetLeft

        if (acc.length > 0 && acc.includes(offset)) {
          return acc
        } else {
          return [...acc, offset]
        }
      }, []).length

      if (this.activeRow >= this.rows) {
        this.activeRow = this.rows - 1
      }
    },
    ...mapActions({
      getArticles: 'articles/getArticles'
    })
  },
  mounted() {
    this.countColumns()
    window.addEventListener('resize', () => this.countColumns())
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/colors';

.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 0px 15px;
  margin-bottom: 30px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    height: 16px;
    width: 16px;
    background: $light-blue;
    cursor: pointer;
    transition: all 0.3s;

    &:focus {
      transform: scale(1.1);
      outline: none;
    }

    &.active {
      background: $blue;
      width: 48px;
    }

    + div {
      margin-left: 16px;
    }
  }
}
</style>
