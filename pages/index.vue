<template>
  <section class="container">
    <h1 class="title">
      коронавирус
    </h1>
    <div class="content-container">
      <Map :data="entityData" />
      <Table v-if="entityData"
             :height="tableHeight"
             :headers="headers"
             :items="entityData"
             :summary="entityTotal"
             class="table"/>
<!--      <h2 class="subtitle">-->
<!--        Nuxt.js project-->
<!--      </h2>-->
    </div>
  </section>
</template>

<script>
import Table from '../components/Table'
import Map from '~/components/Map.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Table,
    Map,
  },

  data() {
    return {
      headers: [
        {
          name: 'Страна',
          value: 'region',
        },
        {
          name: 'Зараженные',
          value: 'confirmed',
        },
        {
          name: 'Смерть',
          value: 'deaths',
        },
      ],
    };
  },

  computed: {
    ...mapState(['entityData', 'entityTotal']),
    tableHeight: () => (document.body.clientHeight - 110),
  },

  created() {
    this.getData();
  },

  methods: {
    ...mapActions(['getData']),
  },
}
</script>

<style lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  background: rgb(11,31,43);
  background: radial-gradient(circle, rgba(11,31,43,1) 58%, rgba(6,28,34,1) 100%);

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    line-height: 100px;
    color: #35495e;
    letter-spacing: 1px;
    opacity: .5;
    z-index: 0;
    filter: blur(5px);
  }

  .content-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 40px 21px;

    .table {
      z-index: 2;
    }
  }
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

