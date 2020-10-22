<template>
  <q-page class="flex justify-center q-pa-md items-start">
    <div v-if="!loaded" class="container row q-gutter-md">
      <PokemonCardSkeleton v-for="index in 20" :key="index" />
    </div>
    <div v-if="noFavorite" class="absolute-center">
      <h3>There is no favorite pokemon yet, try to capture some ;)</h3>
    </div>
    <div v-if="loaded && !noFavorite" class="container row q-gutter-md">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        v-bind="pokemon"
      />
    </div>
    <div v-if="currentPokemon">
      <PokemonCardDetail />
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PokemonCard from "../components/PokemonCard";
import PokemonCardDetail from "../components/PokemonCardDetail";
import PokemonCardSkeleton from "../components/PokemonCardSkeleton";
import Page from "../remote/Page";
import Pokemon from "../remote/Pokemon";

export default {
  name: "PageIndex",
  components: {
    PokemonCard,
    PokemonCardSkeleton,
    PokemonCardDetail,
  },
  data() {
    return {
      loaded: false,
      noFavorite: true,
    };
  },
  computed: {
    ...mapGetters("pokemon", [
      "pokemons",
      "currentOffset",
      "favorites",
      "currentPokemon",
    ]),
  },
  created() {
    if (this.favorites.length == 0) this.loaded = true;
    else this.getPokemon(this.currentOffset);
  },
  methods: {
    ...mapActions("pokemon", [
      "updateCurrentOffset",
      "addFavorite",
      "deleteFavorite",
      "addPokemon",
      "emptyPokemon",
    ]),
    getPokemon(offSet) {
      this.emptyPokemon();
      let id = 0;
      this.favorites.forEach((element) => {
        const types = [];
        const abilities = [];
        let favorited = false;
        Pokemon.pokemonDetailByName(element.toLowerCase()).then((response) => {
          response.data.types.forEach((element) => {
            types.push(element.type.name);
          });
          response.data.abilities.forEach((element) => {
            abilities.push(element.ability.name);
          });

          this.favorites.forEach((element) => {
            if (element.toLowerCase() == response.data.name) {
              favorited = true;
            }
          });

          this.addPokemon({
            id: response.data.id,
            name: response.data.name,
            type: types,
            favorited: favorited,
            picture: `https://pokeres.bastionbot.org/images/pokemon/${response.data.id}.png`,
            ability: abilities,
            height: response.data.height,
            weight: response.data.weight,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`,
          });
          id += 1;
          if (this.favorites.length == id) {
            this.loaded = true;
            this.noFavorite = false;
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 75%;
}
h3 {
  color: rgb(90, 90, 90);
}
</style>
