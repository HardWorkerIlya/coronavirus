<template>
  <section class="container">
    <div>
      <Map :data="data" />
      <h1 class="title">
        coronavirus
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Map from '~/components/Map.vue'

export default {
  components: {
    AppLogo,
    Map,
  },

  data() {
    return {
      data: null,
    };
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

<style>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
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

