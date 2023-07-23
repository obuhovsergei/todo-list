<template>
	<dialog-form v-if="enabled"
			@submit="$emit('submit')"
			@cancel="$emit('cancel')"
			:title="$t('dialogs.confirmUnsavedChanges.title')"
			:cancel-btn="$t('buttons.back')"
			:submit-btn="$t('buttons.save')"
			:description="$t('dialogs.confirmUnsavedChanges.description')">
	</dialog-form>
</template>

<script>
import DialogForm from "@/components/dialogs/Dialog";

export default {
	props: {
		enabled: Boolean
	},
	components: {
		DialogForm
	}
};
</script>

