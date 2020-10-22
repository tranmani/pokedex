import AxiosClient from './AxiosClient';

const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=';

export default {
    nextPrevious(offset) {
        return AxiosClient({
            method: 'get',
            url: `${endpoint}${offset}`
        });
    }
};
