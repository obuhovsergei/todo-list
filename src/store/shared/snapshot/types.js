export const mutationTypes = {
	SET_STATE_SNAPSHOT: "SET_STATE_SNAPSHOT",
	ROLLBACK_STATE: "ROLLBACK_STATE"
};

export const getterTypes = {
	stateContainsUnsavedChanges: "stateContainsUnsavedChanges"
};

export const actionTypes = {
	cancelChanges: "cancelChanges"
};

const snapshotMixinTypes = {
	actionTypes,
	getterTypes,
	mutationTypes
};

export default snapshotMixinTypes;
