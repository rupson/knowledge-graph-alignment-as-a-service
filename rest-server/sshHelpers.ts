import child_process from "child_process";
import util from "util";

const exec = util.promisify(child_process.exec);

const concatCommands = (commands: Array<string>) => commands.join(" & ");

class ExecCommandError extends Error {
	public error;
	public command;
	public sshUrl;
	public username;
	constructor(
		error: string,
		command: string,
		{ sshUrl, username }: { sshUrl: string; username: string },
	) {
		super(`Execution of speicfied command failed`);
		this.error = error;
		this.command = command;
		this.sshUrl = sshUrl || "not provided";
		this.username = username || "not provided";
	}
}

const execCommandInSsh =
	(username: string, url: string) =>
	async (
		command: string,
		// options?: { postProcessor: (stdOut: string) => string },
	) => {
		const execString = `ssh -o StrictHostKeyChecking=no ${username}@${url} "${command}"`;
		const { stderr, stdout } = await exec(execString);
		if (stderr) {
			// throw new ExecCommandError(stderr, command, { sshUrl: url, username });
			console.log(`>> output from stderr::`, stderr)
		}
		return stdout;
	};

const execCommandsInSsh =
	(username: string, url: string) => async (commands: Array<string>) =>
		commands.map(execCommandInSsh(username, url));

export const execInSsh =
	(username: string, url: string) => async (commands: string | Array<string>) =>
		Array.isArray(commands)
			? execCommandsInSsh(username, url)(commands)
			: execCommandInSsh(username, url)(commands);
