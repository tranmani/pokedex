<template>
  <div>
    <q-card class="card">
      <img :src="picture" @click="openCard" />
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
  </div>
</template>

<script>
import PokemonCardDetail from "../components/PokemonCardDetail";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Created",
  components: {
    PokemonCardDetail,
  },
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
    type: {
      type: Array,
      required: true,
    },
    ability: {
      type: Array,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    sprite: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("pokemon", ["pokemons", "card"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("pokemon", [
      "addFavorite",
      "deleteFavorite",
      "updateCard",
      "updateCurrentPokemon",
    ]),
    favorite() {
      this.addFavorite(this.name);
    },
    removeFavorite() {
      this.deleteFavorite(this.name);
    },
    openCard() {
      this.updateCurrentPokemon({
        id: this.id,
        name: this.name,
        type: this.type,
        favorited: this.favorited,
        picture: this.picture,
        ability: this.ability,
        height: this.height,
        weight: this.weight,
        sprite: this.sprite,
      });
      this.updateCard();
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
  padding: 5px;
}
</style>
