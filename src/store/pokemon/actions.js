export function updateCurrentOffset({ commit }, payload) {
  commit('updateCurrentOffset', payload)
}
export function addFavorite({ commit }, payload) {
  commit('addFavorite', payload)
}
export function deleteFavorite({ commit }, payload) {
  commit('deleteFavorite', payload)
}
export function addPokemon({ commit }, payload) {
  commit('addPokemon', payload)
}
export function emptyPokemon({ commit }) {
  commit('emptyPokemon')
}
export function updateCard({ commit }, payload) {
  commit('updateCard', payload)
}
export function updateCurrentPokemon({ commit }, payload) {
  commit('updateCurrentPokemon', payload)
}
export function updateCurrentPokemonFavorite({ commit }, payload) {
  commit('updateCurrentPokemonFavorite', payload)
}
export function updateMobile({ commit }, payload) {
  commit('updateMobile', payload)
}