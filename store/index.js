export const state = () => ({
  posts: [],
  post: {}
});

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload.map(({ fields, sys }) => {
      return { ...fields, ...sys };
    });
  },

  setPost(state, payload) {
    state.post = payload;
  }
};
