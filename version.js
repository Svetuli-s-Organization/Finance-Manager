const { chdir } = require('process');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const [type] = process.argv.slice(2);

if (!type) {
	throw new Error('Missing argument type!');
}

/** Paths should be relative to this file */
const packageDirectoryPaths = ['.', '/angular', '/electron-app'];

for (const packageDirectoryPath of packageDirectoryPaths) {
	const fullPackageDirectoryPath = path.join(__dirname, packageDirectoryPath);
	chdir(fullPackageDirectoryPath);
	const fullPackagePath = path.join(fullPackageDirectoryPath, 'package.json');
	console.log(process.cwd());
	const packageFile = readFileSync(fullPackagePath);
	const packageObject = JSON.parse(packageFile);

	let newVersion = getNewVersion(packageObject.version);
	console.log(`v${newVersion}`);
	const newPackageObject = { ...packageObject, version: newVersion };
	const newPackage = JSON.stringify(newPackageObject, null, 2) + '\n';
	writeFileSync(fullPackagePath, newPackage);
}

function getNewVersion(currentVersion) {
	const [major, minor, patch] = currentVersion.split('.').map(s => +s);

	switch (type) {
		case 'major':
			return `${major + 1}.0.0`;
		case 'minor':
			return `${major}.${minor + 1}.0`;
		case 'patch':
			return `${major}.${minor}.${patch + 1}`;
	}
}
