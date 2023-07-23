import { searchMixinTypes } from "@/store/shared/search/types";

export default class SearchMixinBuilder {
	constructor() {
	}
	
	build() {
		return {
			mutations: {
				[searchMixinTypes.mutationTypes.SET_SEARCH_QUERY](state, value) {
					state.search.query = value;
				}
			},
			actions: {
				async [searchMixinTypes.actionTypes.setSearchQuery]({ commit }, value) {
					commit(searchMixinTypes.mutationTypes.SET_SEARCH_QUERY, value);
				}
			}
		};
	}
}
