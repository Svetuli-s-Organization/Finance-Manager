import { readFileSync, statSync } from 'fs';

import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
	try {
		const tag = core.getInput('tag');
		const token = core.getInput('token');
		const artifact = core.getInput('artifact');
		const releaseAssetName = core.getInput('release-asset-name');

		const { owner, repo } = github.context.repo;

		const octokit = github.getOctokit(token);
		const { createRelease, uploadReleaseAsset } = octokit.rest.repos;

		const release = await createRelease({ owner, repo, tag_name: tag });
		const artifactFileSize = statSync(`./${artifact}`).size;
		const artifactFile = readFileSync(`./${artifact}`);
		await uploadReleaseAsset({
			owner,
			repo,
			headers: {
				'Content-Type': 'application/octet-stream',
				'Content-Length': artifactFileSize,
			},
			release_id: release.data.id,
			name: releaseAssetName,
			data: artifactFile as any,
		});
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
