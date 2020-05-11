export default ({ store }) => {
  return store.dispatch('github/getRepos')
}
