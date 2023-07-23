export const namespace = "alerts";

export const actionTypes = {
	addOnLoadExternalDataError: "addOnLoadExternalDataError",
	addOnSaveExternalError: "addOnSaveExternalError",
	addOnSuccessCreatedInfo: "addOnSuccessCreatedInfo",
	addOnSuccessUpdatedInfo: "addOnSuccessUpdatedInfo",
	addOnSuccessDeletedInfo: "addOnSuccessDeletedInfo",
	addOnDeleteExternalError: "addOnDeleteExternalError",
	addOnSwitchDataError: "addOnSwitchDataError",
	addOnSuccessSwitchedDataInfo: "addOnSuccessSwitchedDataInfo",
}

export const mutationTypes = {
	ADD_ERROR_ALERT: "ADD_ERROR_ALERT",
	REMOVE_ERROR_ALERT: "REMOVE_ERROR_ALERT",
	ADD_INFO_ALERT: "ADD_INFO_ALERT",
	REMOVE_INFO_ALERT: "REMOVE_INFO_ALERT"
};

const alertTypes = {
	actionTypes,
	namespace,
	mutationTypes
};

export default alertTypes;
