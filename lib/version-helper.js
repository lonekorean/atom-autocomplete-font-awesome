'use babel';

const majorVersions = {
	'4': {
		icons: require('../data/v4/icons'),
		modifiers: require('../data/v4/modifiers'),
		snippets: require('../data/v4/snippets'),
		label: 'v4.7.0',
		className: 'aafa-v4',
		stylePrefixMap: {
			'': 'fa'
		},
		iconMoreRoot: 'https://fontawesome.com/v4.7.0/icon/'
	},
	'5': {
		icons: require('../data/v5/icons'),
        modifiers: require('../data/v5/modifiers'),
		snippets: require('../data/v5/snippets'),
		label: 'v5.0.8',
		className: 'aafa-v5',
		stylePrefixMap: {
			'deprecated': 'fa',
			'solid': 'fas',
			'regular': 'far',
			'brands': 'fab'
		},
		iconMoreRoot: 'https://fontawesome.com/icons/'
	}
};

class VersionHelper {
    getCurrentVersionInfo() {
        let version = atom.config.get('autocomplete-font-awesome.version');
		let majorVersion = version.split('.', 1)[0];
        return majorVersions[majorVersion];
    }
}
export default new VersionHelper();
