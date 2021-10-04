const { chdir } = require('process');
const path = require('path');
const { exec } = require('child_process');

const [type] = process.argv.slice(2);

if (!type) {
	throw new Error('Missing argument type!');
}

const versionCommand = `npm version ${type} --no-git-tag-version`;

/** Paths should be relative to this file */
const bumpPaths = ['.', '/angular', '/electron-app'];

for (const bumpPath of bumpPaths) {
	chdir(path.join(__dirname, bumpPath));
	console.log(process.cwd());
	exec(versionCommand);
}
