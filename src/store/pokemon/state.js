import { LocalStorage } from 'quasar'
const favorites = []
// LocalStorage.set(favorites, [""])

export default function () {

  return {
    pokemons: [],
    currentOffset: 0,
    favorites: LocalStorage.getItem(favorites),
    card: false,
    currentPokemon: {}
  }
}
