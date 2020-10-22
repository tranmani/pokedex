import { LocalStorage } from 'quasar'

const favorites = []

export function updateCurrentOffset(state, payload) {
  state.currentOffset = payload
}
export function addFavorite(state, name) {
  let favoritesTemp = state.favorites
  favoritesTemp.push(name)
  LocalStorage.set(favorites, favoritesTemp)
  let index = state.pokemons.findIndex((obj => obj.name == name))
  state.pokemons[index].favorited = true
}
export function deleteFavorite(state, name) {
  let favoritesTemp = state.favorites
  let index = favoritesTemp.findIndex((obj => obj == name))
  favoritesTemp.splice(index, 1)
  LocalStorage.set(favorites, favoritesTemp)
  let index2 = state.pokemons.findIndex((obj => obj.name == name))
  state.pokemons[index2].favorited = false
}
export function addPokemon(state, payload) {
  state.pokemons.push(payload)
}