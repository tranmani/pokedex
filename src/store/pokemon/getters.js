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
  return [...state.favorites]
}
