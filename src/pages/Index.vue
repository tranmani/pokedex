<template>
  <q-page class="flex justify-center q-pa-md items-start">
    <div v-if="!loaded" class="container row q-gutter-md">
      <PokemonCardSkeleton v-for="index in 20" :key="index" />
    </div>
    <div v-if="loaded" class="container row q-gutter-md">
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
    this.getPokemon(this.currentOffset, "undefined");
  },
  methods: {
    ...mapActions("pokemon", [
      "updateCurrentOffset",
      "addFavorite",
      "deleteFavorite",
      "addPokemon",
      "emptyPokemon",
    ]),
    getPokemon(offSet, next) {
      Page.nextPrevious(offSet).then((response) => {
        this.emptyPokemon();
        let id = 1;
        response.data.results.forEach((element) => {
          const types = [];
          const abilities = [];
          let favorited = false;
          Pokemon.pokemonDetailByLink(element.url).then((response2) => {
            response2.data.types.forEach((element) => {
              types.push(
                element.type.name.charAt(0).toUpperCase() +
                  element.type.name.slice(1)
              );
            });
            response2.data.abilities.forEach((element) => {
              abilities.push(
                element.ability.name.charAt(0).toUpperCase() +
                  element.ability.name.slice(1)
              );
            });

            if (this.favorites.length > 0) {
              this.favorites.forEach((element) => {
                if (element.toLowerCase() == response2.data.name) {
                  favorited = true;
                }
              });
            }

            this.addPokemon({
              id: response2.data.id,
              name:
                response2.data.name.charAt(0).toUpperCase() +
                response2.data.name.slice(1),
              type: types,
              favorited: favorited,
              picture: `https://pokeres.bastionbot.org/images/pokemon/${response2.data.id}.png`,
              ability: abilities,
              height: response2.data.height,
              weight: response2.data.weight,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response2.data.id}.png`,
            });
            if (response2.data.id == response.data.results.length) {
              this.loaded = true;
            }
          });
        });
        if (next == "next") this.updateCurrentOffset((offSet += 50));
        else if (next == "previous") this.updateCurrentOffset((offSet -= 50));
        else if (next == "undefined") this.updateCurrentOffset(0);
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 75%;
}
</style>
