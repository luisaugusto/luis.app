export default ({ store }) => {
  return store.dispatch('articles/getArticles')
}
