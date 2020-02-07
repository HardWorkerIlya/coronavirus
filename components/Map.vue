<template>
  <div class="map-container" ref="map" />
</template>

<script>
import world from '../static/wrold.geo'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Map',

  props: {
    data: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
      option: {
        stroke: false,
        fill: true,
        fillColor: '#fff',
        fillOpacity: 1,
      },
      maxCases: 0,
      prevMaxCases: 0,
    }
  },

  computed: {
    ...mapState(['isLoading']),
    compData: vm => vm.data && vm.data.reduce((acc, curr, idx) => {
      const value = parseInt(curr.cases);

      if (value > vm.maxCases) vm.maxCases = value;
      if (value > vm.prevMaxCases && value < vm.maxCases) vm.prevMaxCases = value;
      acc.push({ name: curr.region, value , id: idx });

      return acc;
    }, []),
  },

  watch: {
    compData() {
      this.echartsInit();
    },
  },

  mounted() {
    this.echartsInit();
  },

  methods: {
    ...mapActions(['setMap', 'setReady']),
    echartsInit() {
      this.$echarts.registerMap('WORLD', world);
      const map = this.$echarts.init(this.$refs.map);
      const option = {
        visualMap: {
          type: 'continuous',
          orient: 'horizontal',
          // text: [ this.maxCases, '' ],
          left: 16,
          bottom: 12,
          min: 0,
          max: this.prevMaxCases + 10,
          realtime: true,
          itemHeight: 300,
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: '#35495e',
            fontSize: 16,
          },
          inRange: {
            // color: ['#eeeeee', '#a9403e'],
            // color: ['#e2c1c3', '#863836'],
            color: ['#ffe3e5', '#ee4b4a', '#e20100', '#863836'],
          },
        },
        tooltip : {
          trigger: 'item',
          formatter: (p) => `${p.name}<br/>${p.value || 0}`,
        },
        series:  [
          {
            name: 'Коронавирус',
            type: 'map',
            roam: true,
            map: 'WORLD',
            itemStyle: {
              emphasis: {
                areaColor: '#35495e',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
              },
            },
            zlevel: 5,
            emphasis: {
              label: {
                show: false,
              },
            },
            data: this.compData,
          }
        ],
      };

      map.setOption(option);
      this.setMap(map);
      this.setReady(true);
      // map.on('mouseover', function (params) {
      //   console.log(params);
      //   map.dispatchAction({
      //     type: 'mapSelect',
      //     dataIndex: params.dataIndex,
      //     name: params.name,
      //   });
      // });
    },
  },
}
</script>

<style lang="scss">
.map-container {
  position: fixed!important;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
}
</style>
