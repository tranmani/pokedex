<template>
  <q-page class="row justify-center">
    <q-btn
      flat
      class="col-1 navi-btn"
      size="xl"
      icon="arrow_back_ios"
      @click="previousPage"
    ></q-btn>
    <div class="flex col-10 justify-center q-pt-xl q-pb-xl items-start">
      <div v-if="!loaded" class="container justify-center row">
        <PokemonCardSkeleton class="card" v-for="index in 20" :key="index" />
      </div>
      <div v-if="loaded" class="container justify-center row card">
        <PokemonCard
          class="card"
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          v-bind="pokemon"
        />
      </div>
      <div v-if="currentPokemon">
        <PokemonCardDetail />
      </div>
    </div>
    <q-btn
      flat
      class="col-1 navi-btn"
      size="xl"
      icon="arrow_forward_ios"
      @click="nextPage"
    ></q-btn>
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
  watch: {
    // currentOffset: function (newState, oldState) {
    //   this.getPokemon(this.currentOffset, "undefined");
    // },
  },
  created() {
    this.getPokemon();
  },
  methods: {
    ...mapActions("pokemon", [
      "updateCurrentOffset",
      "addFavorite",
      "deleteFavorite",
      "addPokemon",
      "emptyPokemon",
    ]),
    getPokemon(next) {
      this.emptyPokemon();

      if (next == "next") this.updateCurrentOffset(this.currentOffset + 50);
      else if (next == "previous")
        this.updateCurrentOffset(this.currentOffset - 50);
      else this.updateCurrentOffset(this.currentOffset);

      Page.nextPrevious(this.currentOffset).then((response) => {
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
            id++;
            if (id == response.data.results.length) {
              this.loaded = true;
            }
          });
        });
      });
    },
    nextPage() {
      this.getPokemon("next");
    },
    previousPage() {
      this.getPokemon("previous");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.navi-btn {
  height: calc(100vh - 50px);
  position: sticky;
  top: 50px;
}
</style>
