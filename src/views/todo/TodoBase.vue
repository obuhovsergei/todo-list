<template>
	<content-layout>
		<template #title>
			<slot name="title"></slot>
		</template>
		<template #breadcrumbs>
			<slot name="breadcrumbs"></slot>
		</template>
		<template #content>
			<todo-form ref="form" :namespace="namespace" :id="id" @saved="onSaved"/>
		</template>
	</content-layout>
</template>

<script>
import TodoForm from "@/components/forms/TodoForm";
import ContentLayout from "@/components/layouts/ContentLayout";
import routeNames from "@/router/routeNames";
import { namespace } from "@/store/modules/todo/edit/types";

export default {
	data() {
		return {
			namespace
		};
	},
	computed: {
		id() {
			return this.$route.params.id;
		}
	},
	methods: {
		async onSaved() {
			await this.$router.push({ name: routeNames.todos });
		},
		beforeRouteLeaveHandler(to, from, next) {
			this.$refs.form.beforeRouteLeaveHandler(to, from, next);
		}
	},
	components: {
		TodoForm,
		ContentLayout
	}
};
</script>

<style scoped>

</style>
