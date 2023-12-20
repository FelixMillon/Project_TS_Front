import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
      return {
        token: ""
      }
    },
    mutations: {
        setToken(state, token) {
          state.token = token;
        },
    },
    actions: {
        createToken({ commit }, token) {
            commit('setToken', token);
        }
      },
      getters: {
        getToken: (state) => {
          return state.token;
        }
    },
})

export default store;
