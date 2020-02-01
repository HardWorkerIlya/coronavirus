<template>
  <div class="ig-table-container" :class="{ 'with-header': headers.length }">
    <div v-if="headers.length" class="ig-table-container__head">
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
  </div>
</template>

<script>
export default {
    name: 'IgTable',

    props: {
        headers: {
            type: Array,
            default: () => [],
        },
        items: {},
    },
}
</script>

<style lang="scss">
.ig-table-container {
  position: relative;
  border-radius: 10px;
  overflow: hidden;

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
  }

  .ig-table-container__head {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
}
</style>
