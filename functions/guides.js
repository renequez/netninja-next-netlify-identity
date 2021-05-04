exports.handler = async (event, context) => {
	const guides = [
		{ title: 'beat all zelda bosses', author: 'mario' },
		{ title: 'mario kart shortcuts', author: 'luigi' },
		{ title: 'ultimate street fighter', author: 'chunli' },
	];

	if (context.clientContext.user) {
		return {
			statusCode: 200,
			body: JSON.stringify(guides),
		};
	}

	return {
		statusCode: 401,
		body: JSON.stringify({ msg: 'you must be logged in' }),
	};
};
