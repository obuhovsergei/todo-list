import { getTodos, deleteTodo, getFakeTodos, deleteFakeTodo } from "@/api/todo";
import alertTypes from "@/store/modules/alerts/types";
import { homeTypes } from "@/store/modules/home/types";
import TodosExportModel from "@/store/modules/todos/models/todosExportModel";
import TodosModel from "@/store/modules/todos/models/todosModel";
import TodosStateModel from "@/store/modules/todos/models/todosStateModel";
import { getterTypes, actionTypes, mutationTypes, namespace } from "@/store/modules/todos/types";
import ListingMixinBuilder from "@/store/shared/listing";
import ListingModel from "@/store/shared/listing/models/listingModel";
import PagingMixinBuilder from "@/store/shared/paging";
import PagingModel from "@/store/shared/paging/models/pagingModel";
import SearchMixinBuilder from "@/store/shared/search";
import SearchModel from "@/store/shared/search/models/searchModel";
import SortingMixinBuilder from "@/store/shared/sorting";
import SortingModel from "@/store/shared/sorting/models/sortingModel";
import { sortingOrderType } from "@/store/shared/sorting/models/types/sortingOrderType";
import StateManipulationMixinBuilder from "@/store/shared/stateManipulation";
import { searchObjectByKeys } from "@/utils/array";
import { resolveAction, resolveMutation, resolveNestedState } from "@/utils/vuexModules";

const searchableKeys = ["title"];

class DefaultStateBuilder {
	constructor() {
	}
	
	build() {
		return new TodosStateModel({
			paging: new PagingModel({
				page: 1,
				pageSize: 50
			}),
			sorting: new SortingModel({
				type: "userId",
				order: sortingOrderType.ascending
			}),
			listing: new ListingModel({
				items: [],
				isLoadingState: false
			}),
			search: new SearchModel({
				query: ""
			})
		});
	}
}

const stateManipulationMixin = (new StateManipulationMixinBuilder({
	defaultStateBuilder: new DefaultStateBuilder()
})).build();
const listingMixin = (new ListingMixinBuilder()).build();
const pagingMixin = (new PagingMixinBuilder()).build();
const sortingMixin = (new SortingMixinBuilder()).build();
const searchMixin = (new SearchMixinBuilder()).build();

const state = (new DefaultStateBuilder()).build();

const getters = {
	...listingMixin.getters,
	[getterTypes.formattedItems]: state => {
		//Доп логика
		return state.listing.items.map(x => {
			return { ...x };
		});
	},
	[getterTypes.filteredFormattedItems]: (state, getters) => {
		let items = getters[getterTypes.formattedItems];
		
		if(state.search.query)
			return searchObjectByKeys(items, searchableKeys, state.search.query);
		return items;
	}
};

const actions = {
	...stateManipulationMixin.actions,
	...listingMixin.actions,
	...pagingMixin.actions,
	...sortingMixin.actions,
	...searchMixin.actions,
	async [actionTypes.initialize]({ dispatch }) {
		await dispatch(actionTypes.updateListingItems);
	},
	[actionTypes.destroy]({ dispatch }) {
		dispatch(actionTypes.resetState);
	},
	async [actionTypes.setPagingPage]({ commit }, page) {
		commit(mutationTypes.SET_PAGING_PAGE, page);
	},
	async [actionTypes.updateListingItems]({ commit, dispatch, rootState }) {
		commit(mutationTypes.SET_IS_LISTING_ITEMS_LOADING_STATE, true);
		
		try {
			let apiItems = resolveNestedState(rootState, [homeTypes.namespace]).isRealData ? await getTodos() : await getFakeTodos();
			let todos = apiItems.map(x => new TodosModel({
				...x
			}));
			
			commit(mutationTypes.SET_LISTING_ITEMS, todos);
			commit(mutationTypes.SET_PAGING_TOTAL, todos.length);
		} catch (e) {
			console.error(e);
			
			dispatch(resolveAction(alertTypes.namespace, alertTypes.actionTypes.addOnLoadExternalDataError), null, { root: true });
		} finally {
			commit(mutationTypes.SET_IS_LISTING_ITEMS_LOADING_STATE, false);
		}
	},
	async [actionTypes.deleteTodo]({ dispatch, rootState }, { id }) {
		try {
			resolveNestedState(rootState, [homeTypes.namespace]).isRealData ? await deleteTodo({ id }) : await deleteFakeTodo({ id });
			await dispatch(actionTypes.updateListingItems);
			await dispatch(resolveAction(alertTypes.namespace, alertTypes.actionTypes.addOnSuccessDeletedInfo), null, { root: true });
		} catch (e) {
			console.error(e);
			dispatch(resolveAction(alertTypes.namespace, alertTypes.actionTypes.addOnDeleteExternalError), null, { root: true });
		}
	},
	[actionTypes.save]({ dispatch, getters }) {
		try {
			const resItems = getters[getterTypes.filteredFormattedItems];
			console.log(resItems.map(x => {
				return new TodosExportModel({ field_num: x.id, field_value: x.title });
			}));
		} catch (e) {
			console.error(e);
			dispatch(resolveAction(alertTypes.namespace, alertTypes.actionTypes.addOnLoadExternalDataError), null, { root: true });
		}
	}
};

const mutations = {
	...stateManipulationMixin.mutations,
	...listingMixin.mutations,
	...pagingMixin.mutations,
	...sortingMixin.mutations,
	...searchMixin.mutations
};

const subscribe = (store) => {
	const { dispatch, state } = store;
	store.subscribe(({ type }) => {
		switch (type) {
			case resolveMutation(homeTypes.namespace, homeTypes.mutationTypes.SET_IS_REAL_DATA):
			{
				if(resolveNestedState(state, [namespace]).listing.items.length !== 0)
					dispatch(resolveAction(namespace, actionTypes.initialize));
				break;
			}
			
			default:
				break;
		}
	});
};

export {
	namespace, state, getters, actions, mutations, subscribe
};

const todosModule = {
	namespace, state, getters, actions, mutations, namespaced: true, subscribe
};
export default todosModule;
