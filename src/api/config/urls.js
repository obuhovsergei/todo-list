const baseUrl = process.env.VUE_APP_BASE_API_URL;

export const urlTemplateParts = {
	id: "{id}"
};

const urls = {
	todos: {
		get: `${baseUrl}/todos`,
		getById: `${baseUrl}/todos/${urlTemplateParts.id}`,
		update: `${baseUrl}/todos/${urlTemplateParts.id}`,
		delete: `${baseUrl}/todos/${urlTemplateParts.id}`,
		create: `${baseUrl}/todos`
	}
};

export default urls;
