<template>
  <div class="ig-table-container"
       :class="{ 'with-header': headers && headers.length }">
    <div v-if="headers && headers.length" class="ig-table-container__head">
      <table class="ig-table">
        <thead>
        <tr>
          <th v-for="(col, index) in headers"
              :key="`header-column-${index}`"
              class="ig-table__th">
            {{ col.name }}
          </th>
        </tr>
        </thead>
      </table>
    </div>
    <perfect-scrollbar v-if="items && items.length"
                       ref="scroll"
                       class="ig-table-container__body"
                       :style="style"
                       :class="{ 'with-header': headers.length }"
                       @ps-y-reach-start="reachStart"
                       @ps-y-reach-end="reachEnd"
                       @ps-scroll-up="scrollUp"
                       @ps-scroll-down="scrollDown">
      <table class="ig-table">
        <tbody>
        <tr v-for="(row, rowIdx) in items"
            @mouseover="rowOver(row, rowIdx)"
            @mouseout="rowOut(row, rowIdx)"
            :key="`body-row-${rowIdx}`">
          <td v-for="(col, colIdx) in columns"
              :key="`body-td-${colIdx}`"
              class="ig-table__td">
            {{ row[col] }}
          </td>
        </tr>
        </tbody>
      </table>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'IgTable',

  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number || String,
      default: 0,
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    PerfectScrollbar,
  },

  data() {
    return {
      shadowHeader: false,
      shadowFooter: false,
    };
  },

  computed: {
    ...mapState(['isReadyMap', 'map']),
    columns: vm => {
      if (vm.headers.length) {
        return vm.headers.map(el => el.value);
      } else if (vm.items.length) {
        return Object.keys(vm.items[0])
      }
      return [];
    },
    style: vm => {
      if (vm.height) {
        return { height: `${vm.height - (vm.headers.length ? 60 : 0)}px` };
      }
      return {};
    },
  },

  // created() {
  //   if (this.showSummary && )
  // },

  methods: {
    rowOver(row, idx) {
      if (this.isReadyMap) {
        this.map.dispatchAction({
          type: 'highlight',
          dataIndex: idx,
        });
      }
    },
    rowOut(row, idx) {
      if (this.isReadyMap) {
        this.map.dispatchAction({
          type: 'downplay',
          dataIndex: idx,
        });
      }
    },
    scrollUp() {
      this.shadowFooter = true;
    },
    scrollDown() {
      this.shadowHeader = true;
    },
    reachStart() {
      this.shadowHeader = true;
    },
    reachEnd() {
      this.shadowFooter = false;
    },
  },
}
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />
<style lang="scss">
  .ig-table-container {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    width: 300px;
    background-color: rgba(255, 255, 255, 0.75);

    &.with-header {
      padding-top: 60px;
    }

    .ig-table {
      width: 100%;
      border-collapse: collapse;

      .ig-table__th {
        font-size: 18px;
        line-height: 1.4;
        background-color: transparent;
        padding-top: 18px;
        padding-bottom: 18px;
      }

      .ig-table__th,
      .ig-table__td {
        text-align: left;
      }
      .ig-table__td {
        font-size: 15px;
        color: #808080;
        line-height: 1.4;
        padding: 5px;
      }
    }

    .ig-table-container__head {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
    }
  }
</style>
