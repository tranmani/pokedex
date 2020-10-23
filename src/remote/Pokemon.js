import AxiosClient from './AxiosClient';

const endpoint = 'https://pokeapi.co/api/v2/pokemon/';

export default {
    pokemonDetailByLink(link) {
        return AxiosClient({
            method: 'get',
            url: `${link}`
        });
    },
    pokemonDetailByName(name) {
        return AxiosClient({
            method: 'get',
            url: `${endpoint}${name}`
        });
    },
    pokemonDetailByID(id) {
        return AxiosClient({
            method: 'get',
            url: `${endpoint}${id}`
        });
    }
};
