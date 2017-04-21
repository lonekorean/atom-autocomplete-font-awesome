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
		let matchingIcons = icons.filter((icon) => {
			let base = prefix.replace(/^fa-/, '');
			return icon.id.startsWith(base);
		});

		return matchingIcons.map(this.createSuggestion);
	}

	createSuggestion(icon) {
		return {
			text: 'fa-' + icon.id,
			description: icon.name,
			type: 'value'
		};
	}
}
export default new IconsProvider();
