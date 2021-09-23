import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
	try {
		const tag = core.getInput('tag');
		const token = core.getInput('token');
		const octokit = github.getOctokit(token);
		const { owner, repo } = github.context.repo;

		const response = await octokit.rest.git.getRef({ owner, repo, ref: `tags/${tag}` });
		if (response.status as number === 200) {
			core.setFailed(`Tag ${tag} already exists`);
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
