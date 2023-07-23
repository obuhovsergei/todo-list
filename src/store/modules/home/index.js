import alertModuleTypes from "@/store/modules/alerts/types";
import HomeStateModel from "@/store/modules/home/models/homeStateModel";
import { actionTypes, mutationTypes, namespace, relativeNamespace } from "@/store/modules/home/types";
import BaseMixinBuilder from "@/store/shared/base";
import { resolveAction } from "@/utils/vuexModules";

const realDataName = 'is-real-data';
const baseMixin = (new BaseMixinBuilder()).build();

const state = new HomeStateModel({
	isRealData: false,
	isLoading: false
});

const actions = {
	...baseMixin.actions,
	async [actionTypes.initialize]({ commit }) {
		if(!localStorage.getItem(realDataName)) localStorage.setItem(realDataName, 'false');
		
		else commit(mutationTypes.SET_IS_REAL_DATA, eval(localStorage.getItem(realDataName)) === true)
	},
	async [actionTypes.switchData]({ dispatch, commit }, type) {
		commit(mutationTypes.SET_IS_LOADING_STATE, true);
		try {
			await new Promise(resolve => setTimeout(() => {
				resolve(commit(mutationTypes.SET_IS_REAL_DATA, type));
			}, 1000));
			
			localStorage.setItem(realDataName, type)
			
			await dispatch(resolveAction(alertModuleTypes.namespace, alertModuleTypes.actionTypes.addOnSuccessSwitchedDataInfo),
				null, { root: true });
		} catch (e) {
			console.error(e);
			dispatch(resolveAction(alertModuleTypes.namespace, alertModuleTypes.actionTypes.addOnSwitchDataError),
				null, { root: true });
		} finally {
			commit(mutationTypes.SET_IS_LOADING_STATE, false);
		}
	}
};

const mutations = {
	[mutationTypes.SET_IS_REAL_DATA](state, value) {
		state.isRealData = value;
	},
	[mutationTypes.SET_IS_LOADING_STATE](state, value) {
		state.isLoading = value;
	}
};

export {
	namespace, state, actions, mutations, relativeNamespace
};

const homeModule = {
	namespace, state, actions, mutations, namespaced: true, relativeNamespace
};

export default homeModule;
