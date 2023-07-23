import { actionTypes, mutationTypes } from "@/store/shared/stateManipulation/types";

export default class StateManipulationMixinBuilder {
	constructor({ defaultStateBuilder }) {
		this.defaultStateBuilder = defaultStateBuilder;
	}
	
	build() {
		const defaultStateBuilder = this.defaultStateBuilder;
		
		return {
			mutations: {
				[mutationTypes.SET_STATE](state, value) {
					Object.assign(state, value);
				}
			},
			actions: {
				[actionTypes.resetState]({ commit }) {
					commit(mutationTypes.SET_STATE, defaultStateBuilder.build());
				}
			}
		};
	}
}
