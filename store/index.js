export const state = () => ({
  posts: [],
  post: undefined
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
