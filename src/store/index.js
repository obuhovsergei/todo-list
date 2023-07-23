import Vue from "vue";
import Vuex from "vuex";
import alertsModule from "@/store/modules/alerts";
import todosModule from "@/store/modules/todos";
import todoEditModule from "@/store/modules/todo/edit";
import homeModule from "@/store/modules/home";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		[alertsModule.namespace]: {
			...alertsModule
		},
		[todosModule.namespace]: {
			...todosModule
		},
		[todoEditModule.namespace]: {
			...todoEditModule
		},
		[homeModule.namespace]: {
			...homeModule
		}
	}
});

const registerSubscribers = (store) => {
	todosModule.subscribe(store);
	todoEditModule.subscribe(store);
};
registerSubscribers(store);

export default store;
