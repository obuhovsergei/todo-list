export const processApiPayload = payload => {
	Object.keys(payload).map(function (key) {
		if(payload[key] === "") {
			payload[key] = undefined;
		}
	});
};
