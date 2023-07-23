import { baseActionTypes } from "@/store/shared/base/types";

export const namespace = "home";
export const relativeNamespace = "home";

export const actionTypes = {
	...baseActionTypes,
	switchData: "switchData"
};

export const mutationTypes = {
	SET_IS_LOADING_STATE: "SET_IS_LOADING_STATE",
	SET_IS_REAL_DATA: "SET_IS_REAL_DATA"
};

export const homeTypes = {
	namespace, actionTypes, mutationTypes
};
