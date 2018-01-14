'use babel';

const modifiers = require('../data/v4.7/modifiers');

class ModifiersProvider {
	constructor() {
		this.selector = '*';
		this.suggestionPriority = 2;
	}

	getSuggestions({ prefix }) {
		if (prefix.startsWith('fa-')) {
			return this.findMatchingSuggestions(prefix);
		}
	}

	findMatchingSuggestions(prefix) {
		let prefixBase = prefix.replace(/^fa-/, '');
		let matchingModifiers = modifiers.filter((modifier) => {
			return modifier.id.startsWith(prefixBase);
		});

		return matchingModifiers.map(this.createSuggestion.bind(this, prefixBase, prefix));
	}

	createSuggestion(prefixBase, prefix, modifier) {
		return {
			type: 'value',
			iconHTML: 'fa',
			text: 'fa-' + modifier.id,
			rightLabel: 'modifier',
			description: modifier.description,
			descriptionMoreURL: modifier.documentationURL,
			replacementPrefix: prefix // fixes double prefix bug
		};
	}
}
export default new ModifiersProvider();
