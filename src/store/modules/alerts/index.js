import i18n from "@/plugins/i18n";
import AlertsStateModel from "@/store/modules/alerts/models/alertsStateModel";
import { mutationTypes, namespace, actionTypes } from "@/store/modules/alerts/types";
import AlertModel from "@/store/modules/alerts/models/alertModel";

const state = new AlertsStateModel({
	errorAlerts: [],
	infoAlerts: []
});

const getters = {};

const actions = {
	[actionTypes.addOnLoadExternalDataError]({ commit }) {
		commit(mutationTypes.ADD_ERROR_ALERT, new AlertModel({ text: i18n.t("alerts.errors.loadExternalDataError") }));
	},
	[actionTypes.addOnSuccessCreatedInfo]({ commit }) {
		commit(mutationTypes.ADD_INFO_ALERT, new AlertModel({ text: i18n.t("alerts.info.onSuccessCreated") }));
	},
	[actionTypes.addOnSuccessUpdatedInfo]({ commit }) {
		commit(mutationTypes.ADD_INFO_ALERT, new AlertModel({ text: i18n.t("alerts.info.onSuccessUpdated") }));
	},
	[actionTypes.addOnSaveExternalError]({ commit }) {
		commit(mutationTypes.ADD_ERROR_ALERT, new AlertModel({ text: i18n.t("alerts.errors.onSaveExternalError") }));
	},
	[actionTypes.addOnSuccessDeletedInfo]({ commit }) {
		commit(mutationTypes.ADD_INFO_ALERT, new AlertModel({ text: i18n.t("alerts.info.onSuccessDeleted") }));
	},
	[actionTypes.addOnDeleteExternalError]({ commit }) {
		commit(mutationTypes.ADD_ERROR_ALERT, new AlertModel({ text: i18n.t("alerts.errors.onDeleteExternalError") }));
	},
	[actionTypes.addOnSwitchDataError]({ commit }) {
		commit(mutationTypes.ADD_ERROR_ALERT, new AlertModel({ text: i18n.t("alerts.errors.onSwitchDataError") }));
	},
	[actionTypes.addOnSuccessSwitchedDataInfo]({ commit }) {
		commit(mutationTypes.ADD_INFO_ALERT, new AlertModel({ text: i18n.t("alerts.info.onSuccessSwitchedData") }));
	},
};

const mutations = {
	/**
	 * @param {AlertsStateModel} state
	 * @param {AlertModel} payload
	 */
	[mutationTypes.ADD_ERROR_ALERT](state, payload) {
		state.errorAlerts.push(payload);
	},
	/**
	 * @param {AlertsStateModel} state
	 * @param index
	 */
	[mutationTypes.REMOVE_ERROR_ALERT](state, index) {
		state.errorAlerts.splice(index, 1);
	},
	/**
	 * @param {AlertsStateModel} state
	 * @param {AlertModel} payload
	 */
	[mutationTypes.ADD_INFO_ALERT](state, payload) {
		state.infoAlerts.push(payload);
	},
	/**
	 * @param {AlertsStateModel} state
	 * @param index
	 */
	[mutationTypes.REMOVE_INFO_ALERT](state, index) {
		state.infoAlerts.splice(index, 1);
	}
};

export {
	namespace, state, getters, actions, mutations
};

export default {
	namespace, state, getters, actions, mutations, namespaced: true
};
