import ApiTodoModel from "@/api/models/todo/apiTodoModel";
import { createTodo, getTodo, updateTodo, getFakeTodo, updateFakeTodo, createFakeTodo } from "@/api/todo";
import alertTypes from "@/store/modules/alerts/types";
import { homeTypes } from "@/store/modules/home/types";
import TodoEditStateModel from "@/store/modules/todo/edit/models/todoEditStateModel";
import TodoModel from "@/store/modules/todo/edit/models/todoModel";
import { actionTypes, mutationTypes, namespace, relativeNamespace } from "@/store/modules/todo/edit/types";
import BaseMixinBuilder from "@/store/shared/base";
import FormMixinBuilder from "@/store/shared/form";
import SnapshotMixinBuilder from "@/store/shared/snapshot";
import stateSnapshotKeys from "@/store/shared/snapshot/keys";
import SnapshotOptions from "@/store/shared/snapshot/snapshotOptions";
import StateManipulationMixinBuilder from "@/store/shared/stateManipulation";
import { savingType } from "@/types/savingType";
import { resolveAction, resolveMutation, resolveNestedState } from "@/utils/vuexModules";


const formMixin = (new FormMixinBuilder()).build();
const baseMixin = (new BaseMixinBuilder()).build();
const snapshotMixin = (new SnapshotMixinBuilder({
	options: [
		new SnapshotOptions({
			key: [stateSnapshotKeys.LAST_SAVED],
			fields: ["todo"]
		})
	]
})).build();

class DefaultStateBuilder {
	constructor() {
	}
	
	build() {
		return new TodoEditStateModel({
			todo: new TodoModel({
				userId: null,
				title: "",
				id: null,
				completed: false
			}),
			form: formMixin.state(),
			...snapshotMixin.state()
		});
	}
}

const stateManipulationMixin = (new StateManipulationMixinBuilder({
	defaultStateBuilder: new DefaultStateBuilder()
})).build();

const state = () => (new DefaultStateBuilder()).build();

const getters = {
	...snapshotMixin.getters
};

const actions = {
	...baseMixin.actions,
	...stateManipulationMixin.actions,
	...snapshotMixin.actions,
	async [actionTypes.initialize]({ dispatch, commit }, { id }) {
		if(id) await dispatch(actionTypes.fetch, { id });
		commit(mutationTypes.SET_STATE_SNAPSHOT, stateSnapshotKeys.LAST_SAVED);
	},
	async [actionTypes.fetch]({ commit, dispatch, rootState }, { id }) {
		commit(mutationTypes.SET_IS_FORM_LOADING, true);
		try {
			let item = resolveNestedState(rootState, [homeTypes.namespace]).isRealData
				? await getTodo({ id }) : await getFakeTodo({ id });
			commit(mutationTypes.SET_TITLE, item.title);
			commit(mutationTypes.SET_STATUS, item.completed);
			commit(mutationTypes.SET_USER_ID, item.userId);
			commit(mutationTypes.SET_ID, item.id);
		} catch (e) {
			console.error(e);
			commit(mutationTypes.SET_IS_FORM_DISABLED, true);
			
			dispatch(resolveAction(alertTypes.namespace, alertTypes.actionTypes.addOnLoadExternalDataError), null, { root: true });
		} finally {
			commit(mutationTypes.SET_IS_FORM_LOADING, false);
		}
	},
	async [actionTypes.save]({ commit, state, dispatch, rootState }, { type, id }) {
		try {
			commit(mutationTypes.SET_IS_FORM_SAVING, true);
			
			if(type === savingType.UPDATE) resolveNestedState(rootState, [homeTypes.namespace]).isRealData ? await updateTodo({
				id,
				payload: new ApiTodoModel({
					...state.todo
				})
			}) : await updateFakeTodo({
				id,
				payload: new ApiTodoModel({
					...state.todo
				})
			});
			else resolveNestedState(rootState, [homeTypes.namespace]).isRealData ? await createTodo({
				payload: new ApiTodoModel({
					...state.todo
				})
			}) : await createFakeTodo({
				payload: new ApiTodoModel({
					...state.todo
				})
			});
			
			dispatch(resolveAction(alertTypes.namespace, type === savingType.UPDATE
				? alertTypes.actionTypes.addOnSuccessUpdatedInfo
				: alertTypes.actionTypes.addOnSuccessCreatedInfo), null, { root: true });
			
			commit(mutationTypes.SET_STATE_SNAPSHOT, stateSnapshotKeys.LAST_SAVED);
		} catch (e) {
			dispatch(resolveAction(alertTypes.namespace, alertTypes.actionTypes.addOnSaveExternalError), null, { root: true });
			throw e;
		} finally {
			commit(mutationTypes.SET_IS_FORM_SAVING, false);
		}
	}
};

const mutations = {
	...formMixin.mutations,
	...stateManipulationMixin.mutations,
	...snapshotMixin.mutations,
	[mutationTypes.SET_TITLE](state, value) {
		state.todo.title = value;
	},
	[mutationTypes.SET_STATUS](state, value) {
		state.todo.completed = value;
	},
	[mutationTypes.SET_USER_ID](state, value) {
		state.todo.userId = value;
	},
	[mutationTypes.SET_ID](state, value) {
		state.todo.id = value;
	}
};

const subscribe = (store) => {
	const { dispatch, state } = store;
	store.subscribe(({ type }) => {
		switch (type) {
			case resolveMutation(homeTypes.namespace, homeTypes.mutationTypes.SET_IS_REAL_DATA):
			{
				const todo = resolveNestedState(state, [namespace]).todo;
				if(todo.id !== undefined)
					dispatch(resolveAction(namespace, actionTypes.initialize), todo);
				break;
			}
			
			default:
				break;
		}
	});
};

export {
	namespace, state, getters, actions, mutations, relativeNamespace, subscribe
};

const todoEditModule = {
	namespace, state, getters, actions, mutations, namespaced: true, relativeNamespace, subscribe
};

export default todoEditModule;
