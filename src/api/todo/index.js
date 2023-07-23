import apiClient from "@/api/client/apiClient";
import { mocks } from "@/api/client/mock";
import urls, { urlTemplateParts } from "@/api/config/urls";
import ApiTodoModel from "@/api/models/todo/apiTodoModel";

export const getTodos = async () => {
	let items = await apiClient.get({ url: urls.todos.get });
	return items.map(x => new ApiTodoModel({ ...x }));
};

export const getTodo = async ({ id }) => {
	let response = await apiClient.get({ url: urls.todos.getById.replace(urlTemplateParts.id, id) });
	return new ApiTodoModel({ ...response });
};


export const updateTodo = async ({ id, payload }) => {
	await apiClient.put({ url: urls.todos.update.replace(urlTemplateParts.id, id), payload: { ...payload } });
};

export const deleteTodo = async ({ id }) => {
	await apiClient.delete({ url: urls.todos.delete.replace(urlTemplateParts.id, id) });
};

export const createTodo = async ({ payload }) => {
	await apiClient.post({ url: `${urls.todos.create}`, payload: { ...payload } });
};

// Фейковые данные

export const getFakeTodos = async () => {
	let items = await new Promise(resolve => setTimeout(() => {
		resolve(mocks.todos);
	}, 500));
	return items.map(x => new ApiTodoModel({ ...x }));
};

export const getFakeTodo = async ({ id }) => {
	let response = await new Promise(resolve => setTimeout(() => {
		resolve(mocks.todos.find(x => x.id === id));
	}, 500));
	return new ApiTodoModel({ ...response });
};

export const updateFakeTodo = async ({ id, payload }) => {
	await new Promise(resolve => setTimeout(() => {
		mocks.todos = mocks.todos.map(x => {
			if(x.id === id) x = { ...x, ...payload }
			return x
		})
		resolve();
	}, 500));
};

export const createFakeTodo = async ({ payload }) => {
	await new Promise(resolve => setTimeout(() => {
		resolve(mocks.todos.push({
			...payload,
			id: mocks.todos.reduce((a,b)=>a.y>b.y?a:b).id + 1
		}));
	}, 500));
};

export const deleteFakeTodo = async ({ id }) => {
	await new Promise(resolve => setTimeout(() => {
		mocks.todos = mocks.todos.filter(x => x.id !== id)
		resolve();
	}, 500));
};


