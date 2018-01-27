'use babel';

const versionHelper = require('./version-helper');

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
		let versionInfo = versionHelper.getCurrentVersionInfo();

		let prefixBase = prefix.replace(/^fa-/, '');
		let matchingModifiers = versionInfo.modifiers.filter((modifier) => {
			return modifier.id.startsWith(prefixBase);
		});

		return matchingModifiers.map(this.createSuggestion.bind(this, prefixBase, prefix, versionInfo));
	}

	createSuggestion(prefixBase, prefix, versionInfo, modifier) {
		return {
			type: 'value',
			iconHTML: 'fa',
			text: 'fa-' + modifier.id,
			rightLabel: 'modifier',
			description: modifier.description + ' • ' + versionInfo.label,
			descriptionMoreURL: modifier.documentationURL,
			replacementPrefix: prefix // fixes double prefix bug
		};
	}
}
export default new ModifiersProvider();
