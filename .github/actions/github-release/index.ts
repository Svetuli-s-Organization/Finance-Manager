import { readFileSync } from 'fs';
import { exec } from 'child_process';

import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
	try {
		const tag = core.getInput('tag');
		const token = core.getInput('token');
		const artifacts = core.getInput('artifacts');
		const artifactsList = artifacts.split(', ');

		const { owner, repo } = github.context.repo;
		const { sha } = github.context;

		const octokit = github.getOctokit(token);
		const { rest } = octokit;
		const { git, repos } = rest;

		await git.createTag({ owner, repo, tag, message: '', object: sha, type: 'commit' });
		await git.createRef({ owner, repo, ref: `refs/tags/${tag}`, sha });
		const release = await repos.createRelease({ owner, repo, tag_name: tag });

		const uploadReleaseAssetPromises = artifactsList.map(artifactName => {
			exec('ls');
			const artifactFile = readFileSync(`./${artifactName}`, 'base64');
			return repos.uploadReleaseAsset({
				owner,
				repo,
				release_id: release.data.id,
				name: tag,
				mediaType: {
					format: 'base64'
				},
				data: artifactFile,
			});
		});

		await Promise.all(uploadReleaseAssetPromises);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
