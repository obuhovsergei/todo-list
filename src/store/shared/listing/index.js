import { listingMutationTypes, listingGetterTypes } from "@/store/shared/listing/types";

export default class ListingMixinBuilder {
	constructor() {
	}
	
	build() {
		return {
			getters: {
				[listingGetterTypes.isListingEmpty]: state => {
					if(!state.listing.items)
						return;
					
					return !state.listing.items.length;
				}
			},
			mutations: {
				[listingMutationTypes.SET_LISTING_ITEMS](state, value) {
					state.listing.items = value;
				},
				[listingMutationTypes.SET_IS_LISTING_ITEMS_LOADING_STATE](state, value) {
					state.listing.isLoadingState = value;
				}
			},
			actions: {}
		};
	}
}
