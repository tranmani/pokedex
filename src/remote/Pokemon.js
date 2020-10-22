import AxiosClient from './AxiosClient';

const endpoint = 'pokemon/';

export default {
    pokemonDetail(link) {
        return AxiosClient({
            method: 'get',
            url: `${link}`
        });
    }
};
