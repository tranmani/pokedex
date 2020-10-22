import { LocalStorage } from 'quasar'
const favorites = []
// LocalStorage.set(favorites, ["bulbasaur"])

export default function () {

  return {
    pokemons: [],
    currentOffset: 0,
    favorites: LocalStorage.getItem(favorites)
  }
}
