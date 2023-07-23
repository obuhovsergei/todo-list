<template>
	<v-container fluid class="pa-0 primary lighten-3" style="position: sticky; z-index: 2; max-width: 100vw; bottom: 0">
		<v-row no-gutters>
			<v-col cols="12">
				<v-progress-linear :active="isLoadingState" indeterminate/>
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col cols="12">
				<v-container fluid class="d-flex justify-end px-0">
					<v-btn large text :disabled="isCancelDisabled" @click="dialogEnabled = true" class="mr-4">
						{{ $t("buttons.cancel") }}
					</v-btn>
					<v-btn large :disabled="isSaveDisabled" :loading="isFormSaving" color="primary" @click="onFormSubmit">
						{{ $t("buttons.save") }}
					</v-btn>
					<dialog-form v-if="dialogEnabled"
								 @submit="onCancelFormSubmit"
								 :is-submit-loading="isFormSaving"
								 @cancel="dialogEnabled = false"
								 :title="$t('dialogs.confirmCancelFormChanges.title')"
								 :description="$t('dialogs.confirmCancelFormChanges.description')"/>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import DialogForm from "@/components/dialogs/Dialog";

export default {
	props: {
		isLoadingState: Boolean,
		isCancelDisabled: Boolean,
		isSaveDisabled: Boolean,
		isFormSaving: Boolean
	},
	data() {
		return {
			dialogEnabled: false
		};
	},
	methods: {
		onCancelFormSubmit() {
			this.dialogEnabled = false;
			this.$emit("cancel");
		},
		onFormSubmit() {
			this.$emit("submit");
		}
	},
	components: {
		DialogForm
	}
};
</script>
