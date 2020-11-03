<template>
  <q-page class="bg-dotted">
    <RightClickMenu />
    <div
      class="flex row justify-center items-start"
      :class="paddingTopBottomMobile"
    >
      <div v-if="!loaded" class="container justify-center row">
        <PokemonCardSkeleton v-for="index in 20" :key="index" />
      </div>
      <div v-if="loaded && noFavorite" class="absolute-center">
        <h3>
          There is no favorite pokemon yet <br />
          Try to capture some ;)
        </h3>
      </div>
      <div v-if="loaded && !noFavorite" class="container justify-center row">
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
      noFavorite: true
    };
  },
  computed: {
    ...mapGetters("pokemon", [
      "pokemons",
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
    if (this.favorites.length == 0) this.loaded = true;
    else this.getPokemon(this.currentOffset);
    this.onResize();
  },
  methods: {
    ...mapActions("pokemon", [
      "updateCurrentOffset",
      "addDisplayPokemonByPokemon",
      "emptyDisplayPokemon",
      "updateMobile",
      "updateSearch"
    ]),
    getPokemon(offSet) {
      this.emptyDisplayPokemon();
      let id = 0;
      this.favorites.forEach(element => {
        const types = [];
        const abilities = [];
        let favorited = false;
        Pokemon.pokemonDetailByName(element.toLowerCase()).then(response => {
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
            picture: `https://pokeres.bastionbot.org/images/pokemon/${response.data.id}.png`,
            ability: abilities,
            height: response.data.height,
            weight: response.data.weight,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`
          });
          id += 1;
          if (this.favorites.length == id) {
            this.loaded = true;
            this.noFavorite = false;
          }
        });
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
          this.$router.push({
            path: `search?q=${data}`
          });
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
