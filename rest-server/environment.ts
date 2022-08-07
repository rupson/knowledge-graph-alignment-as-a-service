const ensureIsDefined = (
	maybeUndefined: Array<unknown>,
	options: { otherwise: Function },
): maybeUndefined is Array<string> => {
	if (maybeUndefined.every((entry) => !!entry)) {
		return true;
	}
	options.otherwise(maybeUndefined);
	return false;
};

export const getConfig = () => {
  // @TODO: refactor this into something sensible and more type safety
	const { LOGMAP_URL: logmapUrl, SSH_USER: sshUser } = process.env;
	ensureIsDefined([logmapUrl, sshUser], {
		otherwise: () => {
			console.error(`Required env vars not supplied. Unable to start app.`);
			process.exit();
		},
	});

	return {
		logmapUrl: logmapUrl || '',
		sshUser: sshUser || '',
	};
};
