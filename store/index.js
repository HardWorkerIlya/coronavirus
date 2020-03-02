import Vue from 'vue';
import Vuex from 'vuex';
import { getCodeByName, getNameByCode, getRuNameByCode } from '../static/countryList';

Vue.use(Vuex);


const store = () => new Vuex.Store({

  state: {
    isReadyMap: false,
    isLoading: false,
    dataList: [],
    map: null,
    entityData: null,
    entityTotal: null,
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
      let data, total;

      try {
        data = await this.$axios.$get(`${state.proxy}/https://covid2019-api.herokuapp.com/current?${Date.now()}`);
        total = await this.$axios.$get(`${state.proxy}/https://covid2019-api.herokuapp.com/total?${Date.now()}`);

        dispatch('processData', data);
        dispatch('processTotal', total);
      } catch (e) {
        console.log(e);
        dispatch('getReserveData');
      }
    },
    async getReserveData({ state, dispatch }) {
      let data;

      try {
        data = await this.$axios.$get(`${state.proxy}/https://coronavirus.zone/data.json?${Date.now()}`);

        dispatch('processData', data);
        dispatch('processTotal', data);
      } catch (e) {
        console.log(e);
      }
    },
    processData({ commit }, data) {
      let processed;

      if (Array.isArray(data))  {
        processed = data.map(item => {
          const code = getCodeByName[item.region.replace(/_/g, ' ')] || 'OTHER';
          const region = getRuNameByCode[code];
          const name = getNameByCode[code];

          return {
            code,
            name,
            region,
            confirmed: item.cases,
            deaths: item.death,
          }
        });
      } else {
        processed = Object.keys(data)
          .reduce((acc, curr) => {
            const code = getCodeByName[curr.replace(/_/g, ' ')];
            const region = getRuNameByCode[code];
            const name = getNameByCode[code];

            if (!['ts', 'dt'].includes(curr)) {
              acc.push({
                ...data[curr],
                code,
                name,
                region,
              })
            }

            return acc;
          }, []);
      }
      processed.sort((a, b) => (b.code === 'OTHER' ? -1 : b.confirmed - a.confirmed));

      commit('SET_DATA', processed);
    },
    processTotal({ commit }, total) {
      let processed;

      if (Array.isArray(total))  {
        processed = {
          region: '',
          confirmed: total.reduce((acc, curr) => (acc += parseInt(curr.cases, 10), acc), 0),
          deaths: total.reduce((acc, curr) => (acc += parseInt(curr.death, 10), acc), 0),
        };
      } else {
        processed = { ...total, region: '' };
      }

      commit('SET_TOTAL', processed);
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
    SET_TOTAL(state, total) {
      state.entityTotal = total
    },
  },
});

export default store
