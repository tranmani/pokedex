<template>
  <q-dialog v-model="card">
    <RightClickMenu />
    <q-slide-item class="q-slide" @left="onLeft" @right="onRight">
      <template v-slot:left>
        <q-icon name="arrow_back_ios" />
      </template>
      <template v-slot:right>
        <q-icon name="arrow_forward_ios" />
      </template>
      <q-card class="card" :class="bgGrad">
        <div class="col">
          <div class="row justify-center">
            <q-img
              :src="currentPokemon.picture"
              style="width: 85%"
              class="col"
            />
          </div>
          <div class="row items-center justify-center">
            <h3>{{ currentPokemon.name }} #{{ currentPokemon.id }}</h3>
            <q-img :src="currentPokemon.sprite" class="sprite-img" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="row justify-center">Type</h5>
            <div class="justify-center row">
              <q-chip
                v-for="t in currentPokemon.type"
                size="md"
                dense
                :key="t"
                :class="t.toLowerCase()"
              >
                {{ t }}
              </q-chip>
            </div>
          </div>
          <div class="col">
            <h5 class="row justify-center">Ability</h5>
            <p class="ability" v-for="a in currentPokemon.ability" :key="a">
              {{ a }}
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h5 class="row justify-center">Height</h5>
            <p class="row justify-center">{{ currentPokemon.height }}</p>
          </div>
          <div class="col">
            <h5 class="row justify-center">Weight</h5>
            <p class="row justify-center">{{ currentPokemon.weight }}</p>
          </div>
        </div>

        <p class="blink">SWIPE ME</p>
        <div class="row btn-row">
          <div class="col">
            <q-btn
              flat
              v-if="currentPokemon.favorited"
              class="btn"
              icon="favorite"
              color="red"
              @click="removeFavorite"
              >Favorite</q-btn
            >
            <q-btn
              flat
              v-if="!currentPokemon.favorited"
              class="btn"
              icon="favorite"
              @click="favorite"
              >Favorite</q-btn
            >
          </div>
          <div class="col">
            <q-btn flat class="btn" icon="close" @click="updateCard"
              >Close</q-btn
            >
          </div>
        </div>
      </q-card>
    </q-slide-item>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pokemon from "../remote/Pokemon";
import RightClickMenu from "../components/RightClickMenu";

export default {
  name: "Created",
  components: {
    RightClickMenu,
  },
  props: {},
  computed: {
    ...mapGetters("pokemon", ["currentPokemon", "card", "favorites"]),
    bgGrad() {
      const random = Math.floor(Math.random() * 8) + 1;
      switch (random) {
        case 1:
          return "bg-grad-1";
        case 2:
          return "bg-grad-2";
        case 3:
          return "bg-grad-3";
        case 4:
          return "bg-grad-4";
        case 5:
          return "bg-grad-5";
        case 6:
          return "bg-grad-6";
        case 7:
          return "bg-grad-7";
        case 8:
          return "bg-grad-8";
      }
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("pokemon", [
      "addFavorite",
      "deleteFavorite",
      "updateCard",
      "updateCurrentPokemonFavorite",
      "updateCurrentPokemon",
    ]),
    favorite() {
      this.addFavorite(this.currentPokemon.name);
      this.updateCurrentPokemonFavorite(true);
    },
    removeFavorite() {
      this.deleteFavorite(this.currentPokemon.name);
      this.updateCurrentPokemonFavorite(false);
    },
    onLeft({ reset }) {
      this.getPokemonByID(this.currentPokemon.id - 1);
      this.timer = setTimeout(() => {
        reset();
      }, 100);
    },
    onRight({ reset }) {
      this.getPokemonByID(this.currentPokemon.id + 1);
      this.timer = setTimeout(() => {
        reset();
      }, 100);
    },
    getPokemonByID(id) {
      const types = [];
      const abilities = [];
      let favorited = false;
      Pokemon.pokemonDetailByID(id).then((response) => {
        response.data.types.forEach((element) => {
          types.push(
            element.type.name.charAt(0).toUpperCase() +
              element.type.name.slice(1)
          );
        });
        response.data.abilities.forEach((element) => {
          abilities.push(
            element.ability.name.charAt(0).toUpperCase() +
              element.ability.name.slice(1)
          );
        });

        this.favorites.forEach((element) => {
          if (element.toLowerCase() == response.data.name) {
            favorited = true;
          }
        });

        this.updateCurrentPokemon({
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
      });
    },
  },
  mounted() {},
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style scoped>
h5 {
  margin: 10px 0 0 0;
  text-align: center;
}
h3 {
  margin: 0px;
  text-align: center;
}
p {
  font-size: 1.1em;
}
ul {
  margin: 0px;
}
.q-slide {
  width: 40%;
  overflow: visible;
}
.card {
  padding: 25px;
}
.btn-row {
  padding-top: 0px;
}
.btn {
  width: 100%;
}
.blink {
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  animation: blinker 2s linear infinite;
}
.ability {
  margin: 0px;
  text-align: center;
}

@keyframes blinker {
  50% {
    opacity: 0.5;
  }
}

@media only screen and (min-width: 1921px) {
  .q-slide {
    width: 30%;
  }
  .sprite-img {
    width: 15%;
  }
}

@media only screen and (max-width: 1920px) {
  .q-slide {
    width: 35%;
  }
  .sprite-img {
    width: 15%;
  }
}

@media only screen and (max-width: 1500px) {
  .q-slide {
    width: 40%;
  }
  .sprite-img {
    width: 18%;
  }
}

@media only screen and (max-width: 1200px) {
  .q-slide {
    width: 50%;
  }
  .sprite-img {
    width: 19%;
  }
}

@media only screen and (max-width: 900px) {
  .q-slide {
    width: 60%;
  }
  .sprite-img {
    width: 20%;
  }
}

@media only screen and (max-width: 600px) {
  .q-slide {
    width: 90%;
  }
  .sprite-img {
    width: 22%;
  }
}
</style>
