<template>
  <q-dialog v-model="card">
    <q-card class="card">
      <div class="col">
        <div class="row justify-center">
          <q-img :src="currentPokemon.picture" style="width: 85%" class="col" />
        </div>
        <div class="row items-center justify-center">
          <h3>{{ currentPokemon.name }} #{{ currentPokemon.id }}</h3>
          <q-img :src="currentPokemon.sprite" style="width: 15%" />
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
            v-if="currentPokemon.favorited"
            class="btn"
            icon="favorite"
            color="red"
            @click="removeFavorite"
            >Favorite</q-btn
          >
          <q-btn
            v-if="!currentPokemon.favorited"
            class="btn"
            icon="favorite"
            @click="favorite"
            >Favorite</q-btn
          >
        </div>
        <div class="col">
          <q-btn class="btn" icon="close" @click="updateCard">Close</q-btn>
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
}

@media only screen and (max-width: 1920px) {
  .card {
    width: 35%;
  }
}

@media only screen and (max-width: 1200px) {
  .card {
    width: 60%;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    width: 85%;
  }
}
</style>
