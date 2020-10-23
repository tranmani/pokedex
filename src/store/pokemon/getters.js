export function pokemons(state) {
  const sortedPokemons = [...state.pokemons].sort(function (a, b) {
    return a.id - b.id;
  });

  return sortedPokemons
}
export function currentOffset(state) {
  return state.currentOffset
}
export function favorites(state) {
  return state.favorites
}
export function card(state) {
  return state.card
}
export function currentPokemon(state) {
  return state.currentPokemon
}
export function mobile(state) {
  return state.mobile
}