<template>
	<v-form v-if="!isFormLoadingState" :disabled="isFormDisabled" :readonly="isFormSaving" :ref="refs.form" v-model.trim="formValid">
		<form-container>
			<v-card outlined class="border--primary-lighten-2 rounded-lg elevation-0 mt-4 px-6 pa-4">
				<v-row>
					<v-col cols="12" class="d-flex justify-space-between align-center">
						<v-subheader class="px-0 black--text subtitle-1 font-weight-bold">
							{{ $t("subheaders.totalInformation") }}
						</v-subheader>
						<v-switch :disabled="!id" v-model="status" :label="$t('fields.todos.status')"/>
					</v-col>
					<v-col class="py-0" cols="12" sm="12">
						<v-text-field outlined
									  v-model.trim.number="userId"
									  :rules="validation.userId"
									  :label="$t('fields.todos.userId')"
									  :hint="$t('hints.userId')"
									  autocomplete="off"/>
					</v-col>
					<v-col class="py-0" cols="12" sm="12">
						<v-textarea outlined
									:label="$t('fields.todos.title')"
									v-model.trim="title"
									:rules="validation.title"
									:hint="$t('hints.title')"
									autocomplete="off"/>
					</v-col>
				</v-row>
			</v-card>
		</form-container>
		<form-actions :is-save-disabled="!stateContainsUnsavedChanges || !formValid"
					  :is-cancel-disabled="!stateContainsUnsavedChanges"
					  v-if="isActionsEnabled"
					  :is-form-saving="isFormSaving"
					  :is-loading-state="isFormLoadingState"
					  @cancel="onFormCancel"
					  @submit="submit">
		</form-actions>
		<unsaved-changes-confirm-dialog
				@submit="onSubmitUnsavedChangesConfirm"
				@cancel="onCancelUnsavedChangesConfirm"
				:enabled="confirmUnsavedChangesDialogEnabled"/>
	</v-form>
	<todo-form-loader v-else/>
</template>

<script>
import TodoFormLoader from "@/components/forms/TodoFormLoader";
import FormContainer from "@/components/form/FormContainer";
import formMixin from "@/mixins/formMixin";
import vuexMixin from "@/mixins/vuexMixin";
import FormActions from "@/components/form/FormActions";
import confirmUnsavedChangesMixin from "@/mixins/confirmUnsavedChangesMixin";
import { mutationTypes, actionTypes } from "@/store/modules/todo/edit/types";
import { maxLengths, onlyNumbersRule, prepareMaxLengthRule, requiredRule } from "@/utils/validation";
import { mapInstanceActions, mapInstanceMutations, mapInstanceState } from "@/utils/vuexMapInstanse";

export default {
	mixins: [formMixin, vuexMixin, confirmUnsavedChangesMixin],
	data() {
		return {
			validation: {
				title: [prepareMaxLengthRule({ maxLength: maxLengths.title }), requiredRule()],
				userId: [onlyNumbersRule(), requiredRule()]
			}
		}
	},
	computed: {
		...mapInstanceState({
			todo: state => state.todo
		}),
		title: {
			get() {
				return this.todo.title;
			},
			set(value) {
				this.setTitle(value);
			}
		},
		status: {
			get() {
				return this.todo.completed;
			},
			set(value) {
				this.setStatus(value);
			}
		},
		userId: {
			get() {
				return this.todo.userId;
			},
			set(value) {
				this.setUserId(value);
			}
		}
	},
	methods: {
		...mapInstanceActions({
			fetch: actionTypes.fetch,
			initializeStore: actionTypes.initialize,
			destroyStore: actionTypes.destroy,
			cancelChanges: actionTypes.cancelChanges,
			save: actionTypes.save,
			initializeCountries: actionTypes.initializeCountries
		}),
		...mapInstanceMutations({
			setTitle: mutationTypes.SET_TITLE,
			setStatus: mutationTypes.SET_STATUS,
			setUserId: mutationTypes.SET_USER_ID
		})
	},
	components: {
		FormActions,
		FormContainer,
		TodoFormLoader
	}
};
</script>
