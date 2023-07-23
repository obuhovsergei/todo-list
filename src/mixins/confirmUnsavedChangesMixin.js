import UnsavedChangesConfirmDialog from "@/components/dialogs/UnsavedChangesConfirmDialog";

const confirmUnsavedChangesMixin = {
	data() {
		return {
			confirmUnsavedChangesDialogEnabled: false,
			navigationGuard: () => {}
		};
	},
	methods: {
		async onSubmitUnsavedChangesConfirm() {
			this.confirmUnsavedChangesDialogEnabled = false;
			this.navigationGuard(false);
			await this.submit();
		},
		onCancelUnsavedChangesConfirm() {
			this.confirmUnsavedChangesDialogEnabled = false;
			this.navigationGuard(false);
		},
		beforeRouteLeaveHandler(to, from, next) {
			if(this.stateContainsUnsavedChanges) {
				this.navigationGuard = next;
				this.confirmUnsavedChangesDialogEnabled = true;
			} else
				next();
		}
	},
	components: {
		UnsavedChangesConfirmDialog
	}
};

export default confirmUnsavedChangesMixin;
