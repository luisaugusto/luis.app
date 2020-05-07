<template>
  <section class="articles">
    <div
      class="articles-container"
      @touchstart="touchStart"
      @touchend="touchEnd"
    >
      <Article
        v-for="(article, i) in articles"
        :style="{ '--column-index': i % columns, '--total-columns': columns }"
        :key="article.id"
        :ref="'article-' + article.id"
        :article="article"
        :class="{
          active: i >= columns * activeRow && i < columns * activeRow + columns
        }"
      >
      </Article>
    </div>
    <div
      class="pagination-container"
      :style="{ '--active-row-padding': Math.max(2 - activeRow, 0) }"
    >
      <div class="pagination">
        <div
          tabindex="0"
          v-for="(row, i) in rows"
          :key="row"
          :class="{
            active: activeRow === i,
            small: !(activeRow < i + 3 && activeRow > i - 3)
          }"
          :style="{ '--offset-row': Math.max(activeRow - 5, 0) }"
          @click="activeRow = i"
        ></div>
      </div>
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
    columns: 1,
    touchX: 0
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
    touchStart(e) {
      console.log('touching')
      this.touchX = e.changedTouches[0].screenX
    },
    touchEnd(e) {
      console.log('stopped touching')
      const touchEnd = e.changedTouches[0].screenX
      const diff = touchEnd - this.touchX

      if (diff < -40) {
        if (this.activeRow + 1 < this.rows) {
          this.activeRow += 1
        } else {
          this.activeRow = 0
        }
      }

      if (diff > 40) {
        if (this.activeRow > 0) {
          this.activeRow -= 1
        } else {
          this.activeRow = this.rows - 1
        }
      }

      this.touchX = 0
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
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-gap: 0 15px;
  margin-bottom: 30px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: calc(100vw - 30px);
  overflow: hidden;

  > div {
    height: 16px;
    min-width: 16px;
    background: $light-blue;
    cursor: pointer;
    transition: all 0.3s;

    &:focus {
      transform: scale(1.1);
      outline: none;
    }

    &.small {
      min-width: 8px;
      height: 8px;
    }

    &.active {
      background: $blue;
      min-width: 48px;
    }

    + div {
      margin-left: 16px;
    }
  }
}

@media (max-width: 956px) {
  .pagination-container {
    max-width: 276px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    box-sizing: border-box;
    padding: 0 calc(var(--active-row-padding) * 4px);
  }

  .pagination {
    justify-content: flex-start;

    > div {
      margin-left: calc(var(--offset-row) * -20px);

      &.active {
        min-width: 44px;
      }

      + div {
        margin-left: 12px;
      }
    }
  }
}
</style>
