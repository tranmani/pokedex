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
          class="q-mr-md"
          to="/"
          >Home</q-btn
        >
        <q-btn
          style="color: white"
          flat
          dense
          v-ripple.early
          icon="favorite"
          class="q-mr-xl"
          to="/favorite"
          >Favorites</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {};
  },
};
</script>
