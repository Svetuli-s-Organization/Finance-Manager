import { readFileSync } from 'fs';

import * as core from '@actions/core';

try {
	const packagePath = core.getInput('package-path');
	const file = readFileSync(packagePath, 'utf-8');
	const json = JSON.parse(file);
	const version: string = json.version;
	console.log('!!!VERSION: ', version);
	core.setOutput('version', version);
} catch (error) {
	core.setFailed(error.message);
}
