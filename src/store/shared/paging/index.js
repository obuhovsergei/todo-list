import { pagingMutationTypes, pagingActionTypes } from "@/store/shared/paging/types";
import { listingActionTypes } from "@/store/shared/listing/types";

export default class PagingMixinBuilder {
	constructor() {
	}
	
	build() {
		return {
			mutations: {
				[pagingMutationTypes.SET_PAGING_TOTAL](state, value) {
					state.paging.total = value;
				},
				[pagingMutationTypes.SET_PAGING_PAGE_SIZE](state, value) {
					state.paging.pageSize = value;
				},
				[pagingMutationTypes.SET_PAGING_PAGE](state, value) {
					state.paging.page = value;
				}
			},
			actions: {
				async [pagingActionTypes.setPagingPageSize]({ commit, dispatch }, value) {
					commit(pagingMutationTypes.SET_PAGING_PAGE, 1);
					commit(pagingMutationTypes.SET_PAGING_PAGE_SIZE, value);
					await dispatch(listingActionTypes.updateListingItems);
				},
				async [pagingActionTypes.setPagingPage]({ dispatch, commit }, page) {
					commit(pagingMutationTypes.SET_PAGING_PAGE, page);
					await dispatch(listingActionTypes.updateListingItems);
				}
			}
		};
	}
}
