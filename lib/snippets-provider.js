'use babel';

const versionHelper = require('./version-helper');

class SnippetsProvider {
	constructor() {
		this.selector = '.text.html';
		this.disableForSelector = '.meta.tag, .string.quoted';
		this.suggestionPriority = 2;
	}

	getSuggestions({ prefix }) {
		if (prefix.startsWith('fa')) {
			return this.findMatchingSuggestions(prefix);
		}
	}

	findMatchingSuggestions(prefix) {
		let versionInfo = versionHelper.getCurrentVersionInfo();

		let matchingSnippets = versionInfo.snippets.filter((snippet) => {
			return snippet.shortcode.startsWith(prefix);
		});

		return matchingSnippets.map(this.createSuggestion.bind(this, prefix, versionInfo));
	}

	createSuggestion(prefix, versionInfo, snippet) {
		return {
			type: 'snippet',
			iconHTML: 'fa',
			displayText: snippet.shortcode,
			snippet: snippet.body,
			rightLabel: 'snippet',
			description: snippet.description + ' • ' + versionInfo.label,
			descriptionMoreURL: snippet.documentationURL,
			replacementPrefix: prefix // fixes double prefix bug
		};
	}

	onDidInsertSuggestion({ editor }) {
		// trigger autocomplete again so user can immediately find icon
		setTimeout(() => {
			atom.commands.dispatch(atom.views.getView(editor), 'autocomplete-plus:activate');
		}, 0);
	}
}
export default new SnippetsProvider();
