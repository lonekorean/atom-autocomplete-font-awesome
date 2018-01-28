'use babel';

const versionHelper = require('./version-helper');

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

	findMatchingSuggestions(replacementPrefix) {
		let versionInfo = versionHelper.getCurrentVersionInfo();

		let prefixBase = replacementPrefix.replace(/^fa-/, '');
		let matchingIcons = versionInfo.icons.filter((icon) => {
			let isIdMatch = icon.id.startsWith(prefixBase);
			let isTermMatch = !!this.findTerm(prefixBase, icon.terms);
			return isIdMatch || isTermMatch;
		});
		let prefixedMatchingIcons = this.explodeIconPrefixes(matchingIcons);

		setTimeout(() => {
			debugger;
		}, 500);

		let createSuggestion = this.createSuggestion.bind(this, replacementPrefix, prefixBase, versionInfo);
		return prefixedMatchingIcons.map(createSuggestion);
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

	createSuggestion(replacementPrefix, prefixBase, versionInfo, icon) {
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
			description: icon.label + (icon.style ? ' (' + icon.style + ')' : '') + ' • ' + versionInfo.label,
			descriptionMoreURL: versionInfo.iconMoreRoot + icon.id + (icon.style ? '?style=' + icon.style : ''),
			replacementPrefix: replacementPrefix // fixes double prefix bug
		};
	}
}
export default new IconsProvider();
