import { readFileSync, statSync } from 'fs';

import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
	try {
		const tag = core.getInput('tag');
		const token = core.getInput('token');

		const { owner, repo } = github.context.repo;
		const { sha } = github.context;

		const octokit = github.getOctokit(token);
		const { createTag, createRef } = octokit.rest.git;

		await createTag({ owner, repo, tag, message: '', object: sha, type: 'commit' });
		await createRef({ owner, repo, ref: `refs/tags/${tag}`, sha });
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
