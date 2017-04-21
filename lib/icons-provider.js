'use babel';

const selector = require('../data/icons-selector');
const { icons } = require('../data/icons');

class IconsProvider {
	constructor() {
		this.selector = selector.join(', ');
	}

	getSuggestions(options) {
		const { prefix } = options;

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

		return matchingIcons.map(this.createSuggestion.bind(this, prefixBase));
	}

	findExtraTerm(prefixBase, aliases, filter) {
		let terms = [].concat(aliases || [], filter || []);
		if (prefixBase.length > 0) {
			return terms.find((term) => {
				return typeof term === 'string' && term.startsWith(prefixBase);
			});
		} else {
			return undefined;
		}
	}

	createSuggestion(prefixBase, icon) {
		let className = 'fa-' + icon.id;
		let extraTerm = this.findExtraTerm(prefixBase, icon.aliases, icon.filter);
		return {
			type: 'value',
			iconHTML: '<i class="aafa-fa fa ' + className + ' fa-lg"></i>',
			displayText: className + (extraTerm ? ' (' + extraTerm + ')' : ''),
			text: className,
			rightLabel: '\\' + icon.unicode,
			description: icon.name + ' (added in v' + icon.created.toFixed(1) + ')',
			descriptionMoreURL: 'http://fontawesome.io/icon/' + icon.id
		};
	}
}
export default new IconsProvider();
