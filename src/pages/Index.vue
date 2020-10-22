<template>
  <q-page class="flex flex-center q-pa-md items-start">
    <div v-if="!loaded" class="container row q-gutter-md justify-center">
      <PokemonCardSkeleton v-for="index in 20" :key="index" />
    </div>
    <div v-if="loaded" class="container row q-gutter-md justify-center">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        v-bind="pokemon"
      />
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PokemonCard from "../components/PokemonCard";
import PokemonCardSkeleton from "../components/PokemonCardSkeleton";
import Page from "../remote/Page";
import Pokemon from "../remote/Pokemon";

export default {
  name: "PageIndex",
  components: {
    PokemonCard,
    PokemonCardSkeleton,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    ...mapGetters("pokemon", ["pokemons", "currentOffset", "favorites"]),
  },
  created() {
    this.getPokemon(this.currentOffset);
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
              types.push(element.type.name);
            });
            response2.data.abilities.forEach((element) => {
              abilities.push(element.ability.name);
            });

            this.favorites.forEach((element) => {
              if (element == response2.data.name) {
                favorited = true;
              }
            });

            this.addPokemon({
              id: response2.data.id,
              name: response2.data.name,
              type: types,
              favorited: favorited,
              picture: `https://pokeres.bastionbot.org/images/pokemon/${response2.data.id}.png`,
              ability: abilities,
              height: response2.data.height,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response2.data.id}.png`,
            });
            if (response2.data.id == response.data.results.length) {
              console.log(this.pokemons);
              this.loaded = true;
            }
          });
        });
        if (next) this.updateCurrentOffset((offSet += 50));
        else this.updateCurrentOffset((offSet -= 50));
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
