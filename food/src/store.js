import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
      return {
        userinfo: {}
      }
    },
    mutations: {
        setUserInfo(state, userinfo) {
          state.userinfo = userinfo;
        },
    },
    actions: {
        createUserInfo({ commit }, userinfo) {
            commit('setUserInfo', userinfo);
        }
      },
      getters: {
        getUserInfo: (state) => {
          return state ? state.userinfo : null;
        }
    },
})

export default store;
