// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage'),
			require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageReporter: {
			dir: require('path').join(__dirname, './coverage/finance-manager'),
			reporters: [
				// generates ./coverage/finance-manager/lcov.info
				{ type: 'lcovonly', subdir: '.' },
				// generates ./coverage/finance-manager/coverage-final.json
				{ type: 'json', subdir: '.' },
				{ type: 'text-summary', subdir: '.' },
			],
		},
		reporters: ['progress', 'coverage'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['ChromeHeadlessNoSandbox'],
		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox']
			}
		},
		singleRun: true,
		restartOnFileChange: false,
	});
};
