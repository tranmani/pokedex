<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Pokédex </q-toolbar-title>

        <q-btn
          style="color: white"
          flat
          dense
          v-ripple.early
          icon="home"
          class="q-mr-md q-pa-xs"
          to="/"
          >Home</q-btn
        >
        <q-btn
          style="color: white"
          flat
          dense
          v-ripple.early
          icon="favorite"
          class="q-mr-md q-pa-xs"
          to="/favorite"
          label="Favorites"
          ><q-badge color="red" floating>{{ favorites.length }}</q-badge></q-btn
        >

        <q-btn
          style="color: white"
          flat
          dense
          v-ripple.early
          icon="search"
          class="q-mr-xl q-pa-xs"
          @click="openSearchDialog"
          >Search</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("pokemon", ["favorites"]),
  },
  methods: {
    ...mapActions("pokemon", ["updateSearch"]),
    openSearchDialog() {
      console.log("huy");
      this.updateSearch();
    },
  },
};
</script>
