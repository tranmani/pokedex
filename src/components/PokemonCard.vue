<template>
  <q-card class="card">
    <img :src="picture" />
    <q-card-section>
      <div class="row justify-between items-center">
        <h5 class="float-left">{{ name }}</h5>
        <q-btn
          v-if="!favorited"
          flat
          round
          color="gray"
          icon="favorite"
          class="float-right"
          @click="favorite"
        />
        <q-btn
          v-if="favorited"
          flat
          round
          color="red"
          icon="favorite"
          class="float-right"
          @click="removeFavorite"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Created",
  props: {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    favorited: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters("pokemon", ["pokemons"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("pokemon", ["addFavorite", "deleteFavorite"]),
    favorite() {
      this.addFavorite(this.name);
    },
    removeFavorite() {
      this.deleteFavorite(this.name);
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
h5 {
  margin: 0px;
}
.card {
  width: 100%;
  max-width: 300px;
}
</style>
