export const listingGetterTypes = {
	isListingEmpty: "isListingEmpty",
	formattedItems: "formattedItems",
	filteredFormattedItems: "filteredFormattedItems"
};

export const listingActionTypes = {
	updateListingItems: "updateListingItems"
};

export const listingMutationTypes = {
	SET_LISTING_ITEMS: "SET_LISTING_ITEMS",
	SET_IS_LISTING_ITEMS_LOADING_STATE: "SET_IS_LISTING_ITEMS_LOADING_STATE"
};

const listingStoreMixinTypes = {
	getterTypes: listingGetterTypes,
	actionTypes: listingActionTypes,
	mutationTypes: listingMutationTypes
};

export default listingStoreMixinTypes;
