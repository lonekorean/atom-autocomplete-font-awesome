'use babel';

const icons = require('../data/v4.7/icons');

class IconsProvider {
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
		let matchingIcons = icons.filter((icon) => {
			let isIdMatch = icon.id.startsWith(prefixBase);
			let isExtraTermMatch = this.findExtraTerm(prefixBase, icon.aliases, icon.filter);
			return isIdMatch || !!isExtraTermMatch;
		});

		return matchingIcons.map(this.createSuggestion.bind(this, prefixBase, prefix));
	}

	findExtraTerm(prefixBase, aliases = [], filter = []) {
		let terms = [].concat(aliases, filter);
		if (prefixBase.length > 0) {
			return terms.find((term) => {
				return typeof term === 'string' && term.startsWith(prefixBase);
			});
		} else {
			return undefined;
		}
	}

	createSuggestion(prefixBase, prefix, icon) {
		let extraTerm = this.findExtraTerm(prefixBase, icon.aliases, icon.filter);
		return {
			className: 'aafa aafa-v-4-7',
			type: 'value',
			iconHTML: '<i class="fa fa-' + icon.id + '"></i>',
			displayText: 'fa-' + icon.id + (extraTerm ? ' (' + extraTerm + ')' : ''),
			text: 'fa-' + icon.id,
			rightLabel: '\\' + icon.unicode,
			description: 'Added in v' + icon.created.toFixed(1),
			descriptionMoreURL: 'http://fontawesome.io/icon/' + icon.id,
			replacementPrefix: prefix // fixes double prefix bug
		};
	}
}
export default new IconsProvider();
