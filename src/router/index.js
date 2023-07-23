import TodoCreate from "@/views/todo/create/TodoCreate";
import TodoEdit from "@/views/todo/edit/TodoEdit";
import Todo from "@/views/todo/Todo";
import Todos from "@/views/todos/Todos";
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layouts/Layout";
import routeNames from "@/router/routeNames";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: Layout,
		redirect: { name: routeNames.todos },
		children: [
			{
				path: "todo-list",
				name: routeNames.todos,
				component: Todos
			},
			{
				path: "todo",
				redirect: { name: routeNames.todo.create },
				component: Todo,
				children: [
					{
						path: "create",
						name: routeNames.todo.create,
						component: TodoCreate,
					},
					{
						path: ":id/edit",
						name: routeNames.todo.edit,
						component: TodoEdit,
					}
				]
			},
		]
	}
];

const router = new VueRouter({
	routes,
	mode: "history"
});

export default router;
