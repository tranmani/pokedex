<template>
  <div>
    <q-card color="gray" class="card hvr-underline-from-center">
      <img :src="picture" @click="openCard" class="img" />
      <q-card-section>
        <div class="row justify-between items-center">
          <h5 class="float-left" @click="openCard">
            {{ name }}
          </h5>
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
  cursor: pointer;
}
.card {
  width: 100%;
  max-width: 280px;
  padding: 5px;
  transition: 0.25s;
}
.card:hover {
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition-timing-function: ease-out;
  transition: 0.25s;
}
.img {
  cursor: pointer;
  transition: 0.2s;
}
.img:hover {
  transform: scale(1.25);
  transition-timing-function: ease-out;
  transition-timing-function: cubic-bezier(0, 0, 0.58, 1);
  transition: 0.35s;
}
</style>
