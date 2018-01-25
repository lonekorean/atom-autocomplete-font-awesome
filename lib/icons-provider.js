'use babel';

const versionInfos = {
	'4.7': {
		label: 'v4.7',
		className: 'aafa-v-4-7',
		prefixMap: {
			'default': 'fa'
		},
		moreUrlRoot: 'http://fontawesome.io/icon/',
		icons: require('../data/v4.7/icons')
	},
	'5.0': {
		label: 'v5.0',
		className: 'aafa-v-5-0',
		prefixMap: {
			'solid': 'fas',
			'regular': 'far',
			'brands': 'fab'
		},
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
		let version = atom.config.get('autocomplete-font-awesome.fontAwesomeVersion');
		let versionInfo = versionInfos[version];

		let prefixBase = prefix.replace(/^fa-/, '');
		let matchingIcons = versionInfo.icons.filter((icon) => {
			let isIdMatch = icon.id.startsWith(prefixBase);
			let isTermMatch = !!this.findTerm(prefixBase, icon.terms);
			return isIdMatch || isTermMatch;
		});

		let prefixedMatchingIcons = this.explodeIconPrefixes(matchingIcons);
		let matchingSuggestions = prefixedMatchingIcons.map(this.createSuggestion.bind(this, prefixBase, prefix, versionInfo));
		return matchingSuggestions;
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
			icon.styles.forEach((style) => {
				explodedIcons.push({
					id: icon.id,
					style: style,
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
		let iconPrefix = versionInfo.prefixMap[icon.style];
		return {
			className: 'aafa ' + versionInfo.className,
			type: 'value',
			iconHTML: '<i class="' + iconPrefix + ' fa-' + icon.id + '"></i>',
			leftLabel: iconPrefix,
			displayText: 'fa-' + icon.id + (term ? ' (' + term + ')' : ''),
			text: 'fa-' + icon.id,
			rightLabel: '\\' + icon.unicode,
			description: icon.label + ' (' + icon.style + ') ' + versionInfo.label,
			descriptionMoreURL: versionInfo.moreUrlRoot + icon.id,
			replacementPrefix: prefix // fixes double prefix bug
		};
	}
}
export default new IconsProvider();
