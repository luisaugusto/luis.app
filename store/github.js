export const state = () => ({
  repos: []
})

export const mutations = {
  setRepos(state, repos) {
    state.repos = repos
  }
}

export const actions = {
  async getRepos({ commit, dispatch }) {
    await fetch(`https://api.github.com/users/luisaugusto/repos?sort=updated`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
        Authorization: '66a62d1a8b24bde43c173f19fc07f3d6acc60b78'
      }
    })
      .then((data) => data.json())
      .then((repos) => commit('setRepos', repos))
  }
}
