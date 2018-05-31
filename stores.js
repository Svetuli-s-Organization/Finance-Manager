const Store = require('./store.js');

exports.userPreferencesStore = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 }
  }
});

exports.userMetaDataStore = new Store({
  configName: 'user-metadata',
  defaults: {
    recentFilesPaths: []
  }
});
