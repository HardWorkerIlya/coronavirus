<template>
  <section class="container">
    <h1 class="title">
      коронавирус
    </h1>
    <div class="content-container">
      <Map :data="data" />
      <Table v-if="data"
             :height="tableHeight"
             :headers="headers"
             :items="data"
             class="table"/>
<!--      <h2 class="subtitle">-->
<!--        Nuxt.js project-->
<!--      </h2>-->
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Table from '../components/IgTable'
import Map from '~/components/Map.vue'

export default {
  components: {
    AppLogo,
    Table,
    Map,
  },

  data() {
    return {
      data: null,
      headers: [
        {
          name: 'Страна',
          value: 'region',
        },
        {
          name: 'Зараженные',
          value: 'cases',
        },
        {
          name: 'Смерть',
          value: 'death',
        },
      ],
    };
  },

  computed: {
    tableHeight: () => (document.body.clientHeight - 60),
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      // https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/edit#gid=1702794354
      const proxy = 'https://cors-anywhere.herokuapp.com';
      const data = await this.$axios.$get(`${proxy}/https://coronavirus.zone/data.json?${Date.now()}`);

      this.data = data
    }
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

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
    opacity: .5;
    z-index: 0;
    line-height: 100px;
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

