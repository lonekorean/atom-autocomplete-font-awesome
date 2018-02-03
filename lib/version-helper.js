'use babel';

const versionInfos = {
	'4.7': {
		icons: require('../data/v4.7/icons'),
		modifiers: require('../data/v4.7/modifiers'),
		snippets: require('../data/v4.7/snippets'),
		label: 'v4.7',
		className: 'aafa-v-4-7',
		stylePrefixMap: {
			'': 'fa'
		},
		iconMoreRoot: 'https://fontawesome.com/v4.7.0/icon/'
	},
	'5.0': {
		icons: require('../data/v5.0/icons'),
        modifiers: require('../data/v5.0/modifiers'),
		snippets: require('../data/v5.0/snippets'),
		label: 'v5.0',
		className: 'aafa-v-5-0',
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
        return versionInfos[version];
    }
}
export default new VersionHelper();
