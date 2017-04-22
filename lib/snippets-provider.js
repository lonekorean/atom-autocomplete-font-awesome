'use babel';

const snippets = require('../data/snippets');

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
		let matchingSnippets = snippets.filter((snippet) => {
			return snippet.shortcode.startsWith(prefix);
		});

		return matchingSnippets.map(this.createSuggestion);
	}

	createSuggestion(snippet) {
		return {
			type: 'snippet',
			displayText: snippet.shortcode,
			snippet: snippet.body,
			description: snippet.description,
			descriptionMoreURL: snippet.documentationURL
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
