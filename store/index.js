import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    isReadyMap: false,
    isLoading: false,
    dataList: [],
    map: null,
    entityData: null,
    proxy: 'https://cors-anywhere.herokuapp.com',
  },
  actions: {
    setMap({ commit }, map) {
      commit('SET_MAP', map)
    },
    setReady({ commit }, ready) {
      commit('SET_READY', ready)
    },
    async getData({ state, dispatch }) {
      let data;

      try {
        data = await this.$axios.$get(`${state.proxy}/https://covid2019-api.herokuapp.com/current?${Date.now()}`);

        dispatch('processData', data)
      } catch (e) {
        console.log(e);
        dispatch('getReserveData');
      }
    },
    async getReserveData({ state, dispatch }) {
      let data;

      try {
        data = await this.$axios.$get(`${state.proxy}/https://coronavirus.zone/data.json?${Date.now()}`);

        dispatch('processData', data)
      } catch (e) {
        console.log(e);
      }
    },
    processData({ commit }, data) {
      let processed;

      if (Array.isArray(data))  {
        processed = data.map(item => ({
          region: item.region,
          confirmed: item.cases,
          deaths: item.death,
        }));
      } else {
        processed = Object.keys(data)
          .reduce((acc, curr) => (!['ts', 'dt'].includes(curr) && acc.push({ region: curr, ...data[curr] }), acc), []);
      }

      commit('SET_DATA', processed);
    },
  },
  mutations: {
    SET_MAP(state, map) {
      state.map = map
    },
    SET_READY(state, ready) {
      state.isReadyMap = ready
    },
    SET_DATA(state, data) {
      state.entityData = data
    },
  },
});

export default store
