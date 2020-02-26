<template>
  <colgroup v-if="columns.length">
    <col v-for="(size, index) in columns"
         :width="size"
         :key="`table-col-${index}`"
         :name="`table-column-${index}`" />
  </colgroup>
</template>

<script>
export default {
  name: 'Colgroup',

  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>

</style>
