<template>
  <q-layout view="lHh Lpr lFf">
    <RightClickMenu />
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title :style="mobile == `xs` ? `text-align: center` : ``">
          Pokédex
        </q-toolbar-title>
        <div v-if="mobile != `xs`">
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
            ><q-badge color="red" floating>{{
              favorites.length
            }}</q-badge></q-btn
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
        </div>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs
        v-if="mobile == `xs`"
        v-model="tab"
        inline-label
        switch-indicator
        indicator-color="accent"
        class="bg-primary text-white"
      >
        <q-route-tab name="home" icon="home" label="Home" to="/"> </q-route-tab>
        <q-route-tab
          name="favorite"
          icon="favorite"
          label="Favorite"
          to="/favorite"
        >
          <q-badge color="red" floating>{{ favorites.length }}</q-badge>
        </q-route-tab>
        <q-tab
          name="search"
          icon="search"
          label="Search"
          @click="openSearchDialog"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RightClickMenu from "../components/RightClickMenu";

export default {
  name: "MainLayout",
  components: {
    RightClickMenu,
  },
  data() {
    return { tab: "home" };
  },
  computed: {
    ...mapGetters("pokemon", ["favorites", "mobile"]),
  },
  methods: {
    ...mapActions("pokemon", ["updateSearch"]),
    openSearchDialog() {
      this.updateSearch();
    },
  },
};
</script>
