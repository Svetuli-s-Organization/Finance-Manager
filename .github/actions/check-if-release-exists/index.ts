import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
	try {
		const tag = core.getInput('tag');
		const token = core.getInput('token');
		const octokit = github.getOctokit(token);
		const { owner, repo } = github.context.repo;

		try {
			const response = await octokit.rest.git.getRef({ owner, repo, ref: `tags/${tag}` });
			if (response.status as number === 200) {
				core.setOutput('exists', true);
			}
		} catch (error) {
			if (error.status !== 404) {
				core.setFailed(error.message);
			}
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
