<template>
  <q-dialog v-model="card">
    <q-card class="card">
      <div class="col">
        <q-img :src="currentPokemon.picture" style="width: 100%" />
        <div class="row items-center justify-center">
          <h3>{{ currentPokemon.name }} #{{ currentPokemon.id }}</h3>
          <q-img :src="currentPokemon.sprite" style="width: 15%" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h4 class="row">Type</h4>
          <q-chip
            v-for="t in currentPokemon.type"
            size="md"
            :key="t"
            :class="chipColor"
          >
            {{ t }}
          </q-chip>
        </div>
        <div class="col">
          <h4 class="row">Ability</h4>
          <ul>
            <li v-for="a in currentPokemon.ability" :key="a">
              <p>{{ a }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h4 class="row">Height</h4>
          <p class="row">{{ currentPokemon.height }}</p>
        </div>
        <div class="col">
          <h4 class="row">Weight</h4>
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
    chipColor() {
      this.currentPokemon.type.forEach((element) => {
        if (element.toLowerCase == "normal".toLowerCase) return "normal";
        else if (element.toLowerCase.toLowerCase == "fire".toLowerCase)
          return "fire";
        else if (element.toLowerCase == "fighting".toLowerCase)
          return "fighting";
        else if (element.toLowerCase == "water".toLowerCase) return "water";
        else if (element.toLowerCase == "flying".toLowerCase) return "flying";
        else if (element.toLowerCase == "grass".toLowerCase) return "grass";
        else if (element.toLowerCase == "poison".toLowerCase) return "poison";
        else if (element.toLowerCase == "electric".toLowerCase)
          return "electric";
        else if (element.toLowerCase == "ground".toLowerCase) return "ground";
        else if (element.toLowerCase == "psychic".toLowerCase) return "psychic";
        else if (element.toLowerCase == "rock".toLowerCase) return "rock";
        else if (element.toLowerCase == "ice".toLowerCase) return "ice";
        else if (element.toLowerCase == "bug".toLowerCase) return "bug";
        else if (element.toLowerCase == "dragon".toLowerCase) return "dragon";
        else if (element.toLowerCase == "ghost".toLowerCase) return "ghost";
        else if (element.toLowerCase == "dark".toLowerCase) return "dark";
        else if (element.toLowerCase == "fairy".toLowerCase) return "fairy";
      });
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
h4 {
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
  max-width: 50%;
  padding: 25px;
}
.btn-row {
  padding-top: 25px;
}
.btn {
  width: 100%;
}
</style>
