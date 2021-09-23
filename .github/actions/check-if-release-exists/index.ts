import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
	try {
		const tag = core.getInput('tag');
		const token = core.getInput('tag');
		const octokit = github.getOctokit(token);
		const { owner, repo } = github.context.repo;

		console.log(`token: ${token}`);
		console.log(`owner: ${owner}`);
		console.log(`repo: ${repo}`);

		const response = await octokit.rest.git.getRef({ owner, repo, ref: `tags/${tag}` });
		if (response.status as number === 404) {
			core.setFailed(`Tag ${tag} already exists`);
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
