<template>
  <q-card color="gray" class="card">
    <q-img
      :src="picture"
      @click="openCard"
      class="img"
      placeholder-src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    />
    <q-card-section class="card-section">
      <div class="row justify-between items-center">
        <h5 class="float-left" @click="openCard">
          {{ name }}
        </h5>
        <q-btn
          v-if="!favorited"
          flat
          :size="mobile"
          round
          :dense="mobile == `xs`"
          color="gray"
          icon="favorite"
          class="float-right btn"
          @click="favorite"
        />
        <q-btn
          v-if="favorited"
          flat
          :dense="mobile == `xs`"
          :size="mobile"
          round
          color="red"
          icon="favorite"
          class="float-right btn-favorite btn"
          @click="removeFavorite"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import PokemonCardDetail from "../components/PokemonCardDetail";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Created",
  components: {
    PokemonCardDetail,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    favorited: {
      type: Boolean,
      required: true,
    },
    type: {
      type: Array,
      required: true,
    },
    ability: {
      type: Array,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    sprite: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("pokemon", ["card", "mobile"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("pokemon", [
      "addFavorite",
      "deleteFavorite",
      "updateCard",
      "updateCurrentPokemon",
    ]),
    favorite() {
      this.addFavorite(this.name);
    },
    removeFavorite() {
      this.deleteFavorite(this.name);
    },
    openCard() {
      this.updateCurrentPokemon({
        id: this.id,
        name: this.name,
        type: this.type,
        favorited: this.favorited,
        picture: this.picture,
        ability: this.ability,
        height: this.height,
        weight: this.weight,
        sprite: this.sprite,
      });
      this.updateCard();
    },
  },
  created() {},
  beforeDestroy() {},
};
</script>

<style scoped>
h5 {
  margin: 0px;
  cursor: pointer;
}
.card {
  width: 280px;
  padding: 5px;
  margin: 25px;
  transition: 0.25s;
}
.card:hover {
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition-timing-function: ease-out;
  transition: 0.25s;
}
.img {
  cursor: pointer;
  transition: 0.2s;
}
.img:hover {
  transform: scale(1.25);
  transition-timing-function: ease-out;
  transition-timing-function: cubic-bezier(0, 0, 0.58, 1);
  transition: 0.35s;
}

@media only screen and (max-width: 1200px) {
  .card {
    width: 200px;
    margin: 15px;
  }
  h5 {
    font-size: 0.9em;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    width: 120px;
    margin: 10px;
  }
  h5 {
    font-size: 0.8em;
  }
  .card-section {
    padding: 0px;
  }
}
</style>
