import FormModel from "@/store/shared/form/models/formModel";
import { formMutationTypes } from "@/store/shared/form/types";

export default class FormMixinBuilder {
	constructor() {
	}
	
	build() {
		return {
			getters: {},
			state: () => new FormModel({
				isLoadingState: false,
				isSaving: false,
				isDisabled: false,
				isValid: false,
				isInitialized: false
			}),
			mutations: {
				[formMutationTypes.SET_IS_FORM_LOADING](state, value) {
					state.form.isLoadingState = value;
				},
				[formMutationTypes.SET_IS_FORM_SAVING](state, value) {
					state.form.isSaving = value;
				},
				[formMutationTypes.SET_IS_FORM_VALID](state, value) {
					state.form.isValid = value;
				},
				[formMutationTypes.SET_IS_FORM_DISABLED](state, value) {
					state.form.isDisabled = value;
				},
				[formMutationTypes.SET_IS_FORM_INITIALIZED](state, value) {
					state.form.isInitialized = value;
				}
			},
			actions: {}
		};
	}
}
