import { LocalStorage } from 'quasar'
let favorites = []

if (LocalStorage.has(favorites)) {
  favorites = LocalStorage.getItem(favorites)
}

export default function () {

  return {
    pokemons: [],
    currentOffset: 0,
    favorites: favorites,
    card: false,
    currentPokemon: {},
    mobile: "14px"
  }
}
