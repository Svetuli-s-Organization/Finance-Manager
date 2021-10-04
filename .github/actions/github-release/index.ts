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
		const { createRelease } = octokit.rest.repos;

		await createTag({ owner, repo, tag, message: '', object: sha, type: 'commit' });
		await createRef({ owner, repo, ref: `refs/tags/${tag}`, sha });
		await createRelease({ owner, repo, name: tag, tag_name: tag });
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
