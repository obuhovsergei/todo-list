import { baseActionTypes } from "@/store/shared/base/types";
import { formMutationTypes, formActionTypes } from "@/store/shared/form/types";
import snapshotMixinTypes from "@/store/shared/snapshot/types";
import stateManipulationMixinTypes from "@/store/shared/stateManipulation/types";

export const namespace = "todo-form";
export const relativeNamespace = "edit";

export const getterTypes = {
	...snapshotMixinTypes.getterTypes
};

export const actionTypes = {
	...snapshotMixinTypes.actionTypes,
	...formActionTypes,
	...stateManipulationMixinTypes.actionTypes,
	...baseActionTypes,
	fetch: "fetch"
};

export const mutationTypes = {
	...snapshotMixinTypes.mutationTypes,
	...stateManipulationMixinTypes.mutationTypes,
	...formMutationTypes,
	SET_TITLE: "SET_TITLE",
	SET_ID: "SET_ID",
	SET_STATUS: "SET_STATUS",
	SET_USER_ID: "SET_USER_ID"
};

export const todoFormTypes = {
	actionTypes,
	mutationTypes,
	namespace,
	relativeNamespace
};
