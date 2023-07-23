import { isEqual, pick } from "lodash";
import StateSnapshotService from "@/store/shared/snapshot/stateSnapshotService";
import { SnapshotStateBuilder } from "@/store/shared/snapshot/state";
import { getterTypes, mutationTypes, actionTypes } from "@/store/shared/snapshot/types";
import stateSnapshotKeys from "@/store/shared/snapshot/keys";

export default class SnapshotMixinBuilder {
	/**
	 * @param {SnapshotOptions[]} options
	 */
	constructor({ options }) {
		this.options = options;
	}
	
	getOptions() {
		return Object.assign({}, ...this.options.map(item => ({
			[item.key]: {
				fields: item.fields,
				updateDateTime: Date.now()
			}
		})));
	}
	
	build() {
		const stateSnapshotService = new StateSnapshotService();
		let options = {};
		
		return {
			stateSnapshotService,
			state: () => {
				options = this.getOptions();
				return (new SnapshotStateBuilder({
					options
				})).build();
			},
			getters: {
				[getterTypes.stateContainsUnsavedChanges]: state => {
					JSON.stringify(state.snapshot[stateSnapshotKeys.LAST_SAVED]);
					let { fields } = options[stateSnapshotKeys.LAST_SAVED];
					const currentState = stateSnapshotService.prepareSnapshot(state, fields);
					const lastSavedState = stateSnapshotService.get(stateSnapshotKeys.LAST_SAVED);
					
					return !isEqual(currentState, lastSavedState);
				}
			},
			mutations: {
				[mutationTypes.SET_STATE_SNAPSHOT](state, key) {
					let { fields } = options[key];
					state.snapshot[key].updateDateTime = Date.now();
					
					const snapshot = pick(state, fields);
					
					stateSnapshotService.set(key, snapshot);
				},
				[mutationTypes.ROLLBACK_STATE](state, key) {
					Object.assign(state, stateSnapshotService.get(key));
				}
			},
			actions: {
				[actionTypes.cancelChanges]({ commit }) {
					commit(mutationTypes.ROLLBACK_STATE, stateSnapshotKeys.LAST_SAVED);
				}
			}
		};
	}
}
