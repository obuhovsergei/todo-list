<template>
	<v-dialog value="true" persistent max-width="340">
		<v-card>
			<v-card-title class="headline">{{ title }}</v-card-title>
			<v-card-text>{{ description }}</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="cancel">{{ cancelBtn || $t("buttons.back") }}</v-btn>
				<v-btn text :loading="isSubmitLoading" @click="submit">{{ submitBtn || $t("buttons.ok") }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		title: String,
		description: String,
		cancelBtn: String,
		submitBtn: String,
		isSubmitLoading: Boolean
	},
	methods: {
		submit() {
			this.$emit("submit");
		},
		cancel() {
			this.$emit("cancel");
		}
	}
};
</script>

<style scoped>

</style>
