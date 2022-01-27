<template>
  <q-page class="row justify-center bg-dotted">
    <RightClickMenu />
    <q-btn
      v-if="!currentPokemon.hasOwnProperty('name')"
      flat
      class="col-1 navi-btn"
      size="xl"
      :disable="this.currentOffset == 0"
      @click="previousPage"
    >
      <q-icon
        name="arrow_back_ios"
        :style="mobile == `xs` ? `right: -150%` : ``"
      ></q-icon>
    </q-btn>
    <div
      class="flex col-10 justify-center items-start"
      :class="paddingTopBottomMobile"
    >
      <div v-if="!loaded" class="container justify-center row">
        <PokemonCardSkeleton class="card" v-for="index in 20" :key="index" />
      </div>
      <div v-if="loaded" class="container justify-center row card">
        <PokemonCard
          class="card"
          v-for="pokemon in displayPokemons"
          :key="pokemon.id"
          v-bind="pokemon"
        />
      </div>
      <div v-if="currentPokemon">
        <PokemonCardDetail />
      </div>
    </div>
    <q-btn
      v-if="!currentPokemon.hasOwnProperty('name')"
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
import RightClickMenu from "../components/RightClickMenu";
import Page from "../remote/Page";
import Pokemon from "../remote/Pokemon";
import { LocalStorage } from "quasar";
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
      existed: true
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
    if (this.pokemons.length == 0) {
      this.getPokemon();
    } else {
      this.copyPokemon();
    }

    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    ...mapActions("pokemon", [
      "updateCurrentOffset",
      "addFavorite",
      "deleteFavorite",
      "addPokemon",
      "emptyPokemon",
      "addDisplayPokemonByOffset",
      "emptyDisplayPokemon",
      "updateMobile",
      "updateSearch"
    ]),
    getPokemon(next) {
      this.loaded = false;
      let nextID = 1;
      if (next == "next") {
        this.updateCurrentOffset(this.currentOffset + 50);
        nextID = this.displayPokemons[this.displayPokemons.length - 1].id + 1;
      } else if (next == "previous") {
        this.updateCurrentOffset(this.currentOffset - 50);
        if (this.displayPokemons[0].id - 1 == 0) nextID = 1;
        else nextID = this.displayPokemons[0].id - 1;
      } else this.updateCurrentOffset(this.currentOffset);

      Pokemon.pokemonDetailByID(nextID)
        .then(response => {
          const existed = this.pokemons.some(
            element => element.name.toLowerCase() == response.data.name
          );
          if (!existed) this.getPokemonFromAPI();
          else this.copyPokemon();
        })
        .catch(error => {});
    },
    getPokemonFromAPI() {
      Page.nextPrevious(this.currentOffset).then(response => {
        let id = 1;

        response.data.results.forEach(element => {
          const types = [];
          const abilities = [];
          let favorited = false;

          Pokemon.pokemonDetailByLink(element.url).then(response2 => {
            response2.data.types.forEach(element => {
              types.push(
                element.type.name.charAt(0).toUpperCase() +
                  element.type.name.slice(1)
              );
            });
            response2.data.abilities.forEach(element => {
              abilities.push(
                element.ability.name.charAt(0).toUpperCase() +
                  element.ability.name.slice(1)
              );
            });

            this.favorites.forEach(element => {
              if (element.toLowerCase() == response2.data.name) {
                favorited = true;
              }
            });

            this.addPokemon({
              id: response2.data.id,
              name:
                response2.data.name.charAt(0).toUpperCase() +
                response2.data.name.slice(1),
              type: types,
              favorited: favorited,
              picture: `https://unpkg.com/pokeapi-sprites@2.0.4/sprites/pokemon/other/dream-world/${response2.data.id}.svg`,
              ability: abilities,
              height: response2.data.height,
              weight: response2.data.weight,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${response2.data.id}.gif`,
            });
            id++;
            if (id == response.data.results.length) {
              this.copyPokemon();
              this.loaded = true;
            }
          });
        });
      });
    },
    copyPokemon() {
      this.emptyDisplayPokemon();
      this.addDisplayPokemonByOffset(this.currentOffset);
      this.loaded = true;
    },
    nextPage() {
      this.getPokemon("next");
    },
    previousPage() {
      this.getPokemon("previous");
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
.navi-btn {
  height: calc(100vh - 50px);
  position: sticky;
  top: 50px;
}

@media only screen and (max-width: 600px) {
  .navi-btn {
    bottom: 48px;
  }
}
</style>
