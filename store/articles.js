export const state = () => ({
  list: []
})

export const mutations = {
  set(state, articles) {
    state.list = articles
  }
}

export const actions = {
  async getArticles({ commit }) {
    await fetch(`https://dev.to/api/articles?username=luisaugusto`)
      .then((data) => data.json())
      .then((articles) => commit('set', articles))
  }
}
