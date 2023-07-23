import { listingActionTypes } from "@/store/shared/listing/types";
import { pagingActionTypes } from "@/store/shared/paging/types";
import { searchMixinTypes } from "@/store/shared/search/types";
import { sortingOrderType } from "@/store/shared/sorting/models/types/sortingOrderType";
import { sortingActionTypes } from "@/store/shared/sorting/types";
import { maxLengths, prepareMaxLengthRule } from "@/utils/validation";
import { resolveAction } from "@/utils/vuexModules";

export const listMixin = {
	data() {
		return {
			searchTextFieldRef: "search",
			validation: {
				searchQuery: [prepareMaxLengthRule({ maxLength: maxLengths.search })]
			}
		};
	},
	computed: {
		search() {
			return this.$store.state[this.namespace].search;
		},
		items() {
			return this.$store.state[this.namespace].listing.items;
		},
		isItemsLoadingState() {
			return this.$store.state[this.namespace].listing.isLoadingState;
		},
		sorting() {
			return this.$store.state[this.namespace].sorting;
		},
		paging() {
			return this.$store.state[this.namespace].paging;
		},
		listing() {
			return this.$store.state[this.namespace].listing;
		},
		searchQuery: {
			get() {
				return this.search.query;
			},
			async set(value) {
				if(this.$refs[this.searchTextFieldRef].validate()) {
					await this.setSearchQuery(value);
				}
			}
		},
		options: {
			get() {
				return {
					itemsPerPage: this.paging.pageSize,
					sortBy: [this.sorting.type],
					sortDesc: [this.sorting.order === sortingOrderType.descending],
					page: this.paging.page
				};
			},
			set({ itemsPerPage, sortBy, sortDesc, page }) {
				let sortingType = sortBy.length ? sortBy[0] : null;
				let sortingOrder = sortDesc.length ? (sortDesc[0] ? sortingOrderType.descending : sortingOrderType.ascending) : null;
				
				if(this.sorting.type !== sortingType)
					this.setSortingType(sortingType);
				
				if(this.sorting.order !== sortingOrder)
					this.setSortingOrder(sortingOrder);
				
				if(this.paging.pageSize !== itemsPerPage)
					this.setPagingPageSize(itemsPerPage);
				
				if(this.paging.page !== page)
					this.setPagingPage(page);
			}
		},
		footerOptions: {
			get() {
				return { itemsPerPageOptions: [5, 10, 15, 50, -1] };
			}
		}
	},
	methods: {
		async setSearchQuery(value) {
			await this.$store.dispatch(resolveAction(this.namespace, searchMixinTypes.actionTypes.setSearchQuery), value);
		},
		async setPagingPageSize(value) {
			await this.$store.dispatch(resolveAction(this.namespace, pagingActionTypes.setPagingPageSize), value);
		},
		async setPagingPage(value) {
			await this.$store.dispatch(resolveAction(this.namespace, pagingActionTypes.setPagingPage), value);
		},
		async setSortingType(value) {
			await this.$store.dispatch(resolveAction(this.namespace, sortingActionTypes.setSortingType), value);
		},
		async setSortingOrder(value) {
			await this.$store.dispatch(resolveAction(this.namespace, sortingActionTypes.setSortingOrder), value);
		},
		async updateListingItems(value) {
			await this.$store.dispatch(resolveAction(this.namespace, listingActionTypes.updateListingItems), value);
		},
	}
};
