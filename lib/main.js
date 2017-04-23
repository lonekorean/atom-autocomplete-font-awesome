'use babel';

const snippetsProvider = require('./snippets-provider');
const iconsProvider = require('./icons-provider');
const modifiersProvider = require('./modifiers-provider');

export default {
    getProvider() {
        return [snippetsProvider, iconsProvider, modifiersProvider];
    }
};
