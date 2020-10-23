<template>
  <q-page>
    <div
      class="flex row justify-center items-start"
      :class="paddingTopBottomMobile"
    >
      <div v-if="!loaded" class="container justify-center row">
        <PokemonCardSkeleton />
      </div>
      <div v-if="loaded && noResult" class="absolute-center">
        <h3>
          There is no pokemon name or number<br />
          matched your search :(
        </h3>
      </div>
      <div v-if="loaded && !noResult" class="container justify-center row">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          v-bind="pokemon"
        />
      </div>
      <div v-if="currentPokemon">
        <PokemonCardDetail />
      </div>
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
      noResult: false,
    };
  },
  computed: {
    ...mapGetters("pokemon", [
      "pokemons",
      "currentOffset",
      "favorites",
      "currentPokemon",
      "search",
      "mobile",
    ]),
    paddingTopBottomMobile() {
      if (this.mobile == "xs" || this.mobile == "md") return "q-pt-md q-pb-md";
      else return "q-pt-xl q-pb-xl";
    },
  },
  watch: {
    search: function (newState, oldState) {
      if (newState) this.searchDialog();
    },
  },
  created() {
    this.getPokemonbyName(this.$route.query.q);
    this.onResize();
  },
  methods: {
    ...mapActions("pokemon", [
      "addPokemon",
      "emptyPokemon",
      "updateMobile",
      "updateSearch",
    ]),
    getPokemonbyName(name) {
      this.loaded = false;
      this.emptyPokemon();
      const types = [];
      const abilities = [];
      let favorited = false;
      Pokemon.pokemonDetailByName(name.toLowerCase())
        .then((response) => {
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
            name:
              response.data.name.charAt(0).toUpperCase() +
              response.data.name.slice(1),
            type: types,
            favorited: favorited,
            picture: `https://pokeres.bastionbot.org/images/pokemon/${response.data.id}.png`,
            ability: abilities,
            height: response.data.height,
            weight: response.data.weight,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`,
          });
          this.loaded = true;
          this.noResult = false;
        })
        .catch((error) => {
          if (error.response) {
            this.loaded = true;
            this.noResult = true;
          }
        });
    },
    onResize() {
      if (window.innerWidth <= 600) {
        this.updateMobile("xs");
      } else if (window.innerWidth <= 1200) {
        this.updateMobile("md");
      }
    },
    searchDialog() {
      this.$q
        .dialog({
          title: "Search pokemon by name or number",
          prompt: {
            model: "",
            isValid: (val) => val.length > 0,
          },
          cancel: true,
        })
        .onOk((data) => {
          this.getPokemonbyName(data);
        })
        .onDismiss(() => {
          this.updateSearch();
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
h3 {
  color: rgb(90, 90, 90);
}
</style>
