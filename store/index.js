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
  actions: {},
  mutations: {},
});

export default store
