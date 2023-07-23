import { baseActionTypes } from "@/store/shared/base/types";
import stateManipulationMixinTypes from "@/store/shared/stateManipulation/types";

export default class BaseMixinBuilder {
	constructor() {
	}
	
	build() {
		return {
			actions: {
				[baseActionTypes.initialize]() {
				},
				[baseActionTypes.destroy]({ dispatch }) {
					dispatch(stateManipulationMixinTypes.actionTypes.resetState);
				}
			}
		};
	}
}
