'use babel';

const versionInfos = {
	'4.7': {
		className: 'aafa-v-4-7',
		moreUrlRoot: 'http://fontawesome.io/icon/',
		icons: require('../data/v4.7/icons')
	},
	'5.0': {
		className: 'aafa-v-5-0',
		moreUrlRoot: 'https://fontawesome.com/icons/',
		icons: require('../data/v5.0/icons')
	}
};

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
		let version = '5.0'; // TODO: read from settings
		let versionInfo = versionInfos[version];

		let prefixBase = prefix.replace(/^fa-/, '');
		let matchingIcons = versionInfo.icons.filter((icon) => {
			let isIdMatch = icon.id.startsWith(prefixBase);
			let isTermMatch = !!this.findTerm(prefixBase, icon.terms);
			return isIdMatch || isTermMatch;
		});

		let prefixedMatchingIcons = this.explodeIconPrefixes(matchingIcons);
		return prefixedMatchingIcons.map(this.createSuggestion.bind(this, prefixBase, prefix, versionInfo));
	}

	findTerm(prefixBase, terms) {
		if (prefixBase.length > 0) {
			return terms.find((term) => {
				return term.startsWith(prefixBase);
			});
		}
	}

	explodeIconPrefixes(icons) {
		let explodedIcons = [];
		icons.forEach((icon) => {
			icon.prefixes.forEach((prefix) => {
				explodedIcons.push({
					id: icon.id,
					prefix: prefix,
					label: icon.label,
					terms: icon.terms,
					unicode: icon.unicode
				});
			});
		});
		return explodedIcons;
	}

	createSuggestion(prefixBase, prefix, versionInfo, icon) {
		let term = this.findTerm(prefixBase, icon.terms);
		return {
			className: 'aafa ' + versionInfo.className,
			type: 'value',
			iconHTML: '<i class="' + icon.prefix + ' fa-' + icon.id + '"></i>',
			leftLabel: icon.prefix,
			displayText: 'fa-' + icon.id + (term ? ' (' + term + ')' : ''),
			text: 'fa-' + icon.id,
			rightLabel: '\\' + icon.unicode,
			description: icon.label,
			descriptionMoreURL: versionInfo.moreUrlRoot + icon.id,
			replacementPrefix: prefix // fixes double prefix bug
		};
	}
}
export default new IconsProvider();
