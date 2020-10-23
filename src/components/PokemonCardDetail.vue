<template>
  <q-dialog v-model="card">
    <q-card class="card" :class="bgGrad">
      <div class="col">
        <div class="row justify-center">
          <q-img :src="currentPokemon.picture" style="width: 85%" class="col" />
        </div>
        <div class="row items-center justify-center">
          <h3>{{ currentPokemon.name }} #{{ currentPokemon.id }}</h3>
          <q-img :src="currentPokemon.sprite" class="sprite-img" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h5 class="row">Type</h5>
          <q-chip
            v-for="t in currentPokemon.type"
            size="md"
            :key="t"
            :class="t.toLowerCase()"
          >
            {{ t }}
          </q-chip>
        </div>
        <div class="col">
          <h5 class="row">Ability</h5>
          <ul>
            <li v-for="a in currentPokemon.ability" :key="a">
              <p>{{ a }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h5 class="row">Height</h5>
          <p class="row">{{ currentPokemon.height }}</p>
        </div>
        <div class="col">
          <h5 class="row">Weight</h5>
          <p class="row">{{ currentPokemon.weight }}</p>
        </div>
      </div>

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
          <q-btn flat class="btn" icon="close" @click="updateCard">Close</q-btn>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Created",
  props: {},
  computed: {
    ...mapGetters("pokemon", ["currentPokemon", "card"]),
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
    ]),
    favorite() {
      this.addFavorite(this.currentPokemon.name);
      this.updateCurrentPokemonFavorite(true);
    },
    removeFavorite() {
      this.deleteFavorite(this.currentPokemon.name);
      this.updateCurrentPokemonFavorite(false);
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
h5 {
  margin: 0px;
  text-align: center;
}
h3 {
  margin: 0px;
  text-align: center;
}
p {
  font-size: 1.1em;
}
.card {
  width: 40%;
  padding: 25px;
}
.btn-row {
  padding-top: 25px;
}
.btn {
  width: 100%;
}

@media only screen and (min-width: 1921px) {
  .card {
    width: 30%;
  }
  .sprite-img {
    width: 15%;
  }
}

@media only screen and (max-width: 1920px) {
  .card {
    width: 35%;
  }
  .sprite-img {
    width: 15%;
  }
}

@media only screen and (max-width: 1500px) {
  .card {
    width: 40%;
  }
  .sprite-img {
    width: 18%;
  }
}

@media only screen and (max-width: 1200px) {
  .card {
    width: 50%;
  }
  .sprite-img {
    width: 19%;
  }
}

@media only screen and (max-width: 900px) {
  .card {
    width: 60%;
  }
  .sprite-img {
    width: 20%;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    width: 90%;
  }
  .sprite-img {
    width: 22%;
  }
}
</style>
