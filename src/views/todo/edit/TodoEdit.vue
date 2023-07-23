<template>
	<todo-base ref="base">
		<template #title>{{ $t("titles.todos.edition") }}</template>
		<template #breadcrumbs>
			<v-breadcrumbs :items="breadcrumbs" divider="/" />
		</template>
	</todo-base>
</template>

<script>
import { i18n } from "@/plugins";
import routeNames from "@/router/routeNames";
import TodoBase from "@/views/todo/TodoBase";

export default {
	data() {
		return {
			breadcrumbs: [
				{
					to: { name: routeNames.home },
					text: i18n.t("breadcrumbs.home")
				},
				{
					to: { name: routeNames.todos },
					text: i18n.t("breadcrumbs.todos")
				},
				{
					to: { name: routeNames.todo.create },
					text: i18n.t("breadcrumbs.todo.edit"),
					disabled: true
				}
			]
		}
	},
	components: { TodoBase },
	beforeRouteLeave(to, from, next) {
		this.$refs.base.beforeRouteLeaveHandler(to, from, next);
	}
};
</script>

<style scoped>

</style>
