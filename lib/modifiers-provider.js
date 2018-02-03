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

	findMatchingSuggestions(replacementPrefix) {
		let versionInfo = versionHelper.getCurrentVersionInfo();

		let prefixBase = replacementPrefix.replace(/^fa-/, '');
		let matchingModifiers = versionInfo.modifiers.filter((modifier) => {
			return modifier.id.startsWith(prefixBase);
		});

		let createSuggestion = this.createSuggestion.bind(this, replacementPrefix, prefixBase, versionInfo);
		return matchingModifiers.map(createSuggestion);
	}

	createSuggestion(replacementPrefix, prefixBase, versionInfo, modifier) {
		return {
			type: 'value',
			iconHTML: 'fa',
			text: 'fa-' + modifier.id,
			rightLabel: 'modifier',
			description: modifier.description + ' • ' + versionInfo.label,
			descriptionMoreURL: modifier.documentationURL,
			replacementPrefix: replacementPrefix // fixes double prefix bug
		};
	}
}
export default new ModifiersProvider();
