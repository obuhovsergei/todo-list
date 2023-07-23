import { sortingActionTypes, sortingMutationTypes } from "@/store/shared/sorting/types";

export default class SortingMixinBuilder {
	constructor() {
	}
	
	build() {
		return {
			mutations: {
				[sortingMutationTypes.SET_SORTING_ORDER](state, value) {
					state.sorting.order = value;
				},
				[sortingMutationTypes.SET_SORTING_TYPE](state, value) {
					state.sorting.type = value;
				}
			},
			actions: {
				async [sortingActionTypes.setSortingOrder]({ commit }, value) {
					commit(sortingMutationTypes.SET_SORTING_ORDER, value);
				},
				async [sortingActionTypes.setSortingType]({ commit }, value) {
					commit(sortingMutationTypes.SET_SORTING_TYPE, value);
				}
			}
		};
	}
}
