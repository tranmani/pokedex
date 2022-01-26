<template>
  <q-page class="bg-dotted">
    <RightClickMenu />
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
          v-for="pokemon in displayPokemons"
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
import RightClickMenu from "../components/RightClickMenu";
import Page from "../remote/Page";
import Pokemon from "../remote/Pokemon";

export default {
  name: "PageIndex",
  components: {
    PokemonCard,
    PokemonCardSkeleton,
    PokemonCardDetail,
    RightClickMenu
  },
  data() {
    return {
      loaded: false,
      noResult: false
    };
  },
  computed: {
    ...mapGetters("pokemon", [
      "displayPokemons",
      "currentOffset",
      "favorites",
      "currentPokemon",
      "search",
      "mobile"
    ]),
    paddingTopBottomMobile() {
      if (this.mobile == "xs" || this.mobile == "md") return "q-pt-md q-pb-md";
      else return "q-pt-xl q-pb-xl";
    }
  },
  watch: {
    search: function(newState, oldState) {
      if (newState) this.searchDialog();
    }
  },
  created() {
    this.$q.addressbarColor.set("#7AC89E");
    this.getPokemonbyName(this.$route.query.q);
    this.onResize();
  },
  methods: {
    ...mapActions("pokemon", [
      "addDisplayPokemonByPokemon",
      "emptyDisplayPokemon",
      "updateMobile",
      "updateSearch"
    ]),
    getPokemonbyName(name) {
      this.loaded = false;
      this.emptyDisplayPokemon();
      const types = [];
      const abilities = [];
      let favorited = false;
      Pokemon.pokemonDetailByName(name.toLowerCase())
        .then(response => {
          response.data.types.forEach(element => {
            types.push(element.type.name);
          });
          response.data.abilities.forEach(element => {
            abilities.push(element.ability.name);
          });

          this.favorites.forEach(element => {
            if (element.toLowerCase() == response.data.name) {
              favorited = true;
            }
          });

          this.addDisplayPokemonByPokemon({
            id: response.data.id,
            name:
              response.data.name.charAt(0).toUpperCase() +
              response.data.name.slice(1),
            type: types,
            favorited: favorited,
            picture: `https://unpkg.com/pokeapi-sprites@2.0.4/sprites/pokemon/other/dream-world/${response.data.id}.svg`,
            ability: abilities,
            height: response.data.height,
            weight: response.data.weight,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${response.data.id}.gif`,
          });
          this.loaded = true;
          this.noResult = false;
        })
        .catch(error => {
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
            isValid: val => val.length > 0
          },
          cancel: true
        })
        .onOk(data => {
          this.getPokemonbyName(data);
        })
        .onDismiss(() => {
          this.updateSearch();
        });
    }
  }
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
