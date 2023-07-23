import FormActions from "@/components/form/FormActions";
import { formTypes } from "@/store/shared/form/types";
import snapshotMixinTypes from "@/store/shared/snapshot/types";
import { savingType } from "@/types/savingType";
import { mapInstanceState } from "@/utils/vuexMapInstanse";
import { resolveGetter, resolveMutation } from "@/utils/vuexModules";

const formMixin = {
	props: {
		id: [String, Number],
		isActionsEnabled: {
			default: true
		},
		isPersistentStore: {
			type: Boolean,
			default: false
		},
		isDisabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			refs: {
				form: "form"
			},
			formValid: true
		};
	},
	computed: {
		isCreateMode() {
			return !this.$route.params.id;
		},
		stateContainsUnsavedChanges() {
			return this.$store.getters[resolveGetter(this.namespace, snapshotMixinTypes.getterTypes.stateContainsUnsavedChanges)];
		},
		...mapInstanceState({
			isFormSaving: state => state.form.isSaving,
			isFormDisabled: state => state.form.isDisabled,
			isFormLoadingState: state => state.form.isLoadingState
		})
	},
	methods: {
		initializeStore() {
			throw new Error();
		},
		fetch() {
			throw new Error();
		},
		onFormCancel() {
			this.cancelChanges();
			this.$nextTick(() => {
				this.$refs[this.refs.form].resetValidation();
			});
		},
		validate() {
			return this.$refs[this.refs.form].validate();
		},
		setIsFormDisabled(value) {
			this.$store.commit(resolveMutation(this.namespace, formTypes.mutationTypes.SET_IS_FORM_DISABLED), value);
		},
		setIsFormValid(value) {
			this.$store.commit(resolveMutation(this.namespace, formTypes.mutationTypes.SET_IS_FORM_VALID), value);
		},
		async submit() {
			if(this.validate()) {
				try {
					this.isCreateMode
						? await this.save({ type: savingType.CREATE })
						: await this.save({ type: savingType.UPDATE, id: this.$route.params.id });
					
					this.$emit("saved");
				} catch (e) {
					console.error(e);
				}
			}
		}
	},
	watch: {
		id: {
			handler() {
				this.initializeStore({ id: this.id });
				this.setIsFormDisabled(this.isDisabled);
			},
			immediate: true
		},
		isDisabled: {
			handler() {
				this.setIsFormDisabled(this.isDisabled);
			},
			immediate: true
		},
		formValid: {
			handler(value) {
				this.setIsFormValid(value);
			},
			immediate: true
		}
	},
	beforeDestroy() {
		if(!this.isPersistentStore)
			this.destroyStore();
	},
	components: {
		FormActions
	}
};

export default formMixin;
