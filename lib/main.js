'use babel';

const snippetsProvider = require('./snippets-provider');
const iconsProvider = require('./icons-provider');

export default {
    getProvider() {
        return [snippetsProvider, iconsProvider];
    }
};
