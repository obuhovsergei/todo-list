export default class FormModel {
	constructor({ isLoadingState, isSaving, isDisabled, isValid, isInitialized }) {
		this.isLoadingState = isLoadingState;
		this.isSaving = isSaving;
		this.isDisabled = isDisabled;
		this.isValid = isValid;
		this.isInitialized = isInitialized;
	}
}
