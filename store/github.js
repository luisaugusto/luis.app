export const state = () => ({
  repos: []
})

export const mutations = {
  setRepos(state, repos) {
    state.repos = repos
  }
}

export const actions = {
  async getRepos({ commit }) {
    await fetch(`https://api.github.com/users/luisaugusto/repos?sort=updated`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
        Authorization: '6e89860a585ec95f3f044104e85a7553b09d8cde'
      }
    })
      .then((data) => data.json())
      .then((repos) => {
        commit('setRepos', repos)
      })
  }
}
