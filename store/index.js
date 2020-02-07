import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    isReadyMap: false,
    isLoading: false,
    dataList: [],
    map: null,
  },
  actions: {
    setMap: () => ({ commit }, map) => commit('SET_MAP', map),
  },
  mutations: {
    SET_MAP: (state, map) => (state.map = map),
  },
});

export default store
