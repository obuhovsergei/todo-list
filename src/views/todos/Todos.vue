<template>
	<list-layout :is-no-data="isNoData && !isItemsLoadingState">
		<template #title>
			{{ $t("titles.todos.all") }}
		</template>
		<template #actions>
			<div class="d-flex justify-end align-center">
				<v-btn class="mr-4"
					   :disabled="isItemsLoadingState"
					   @click="save">
					{{ $t("buttons.save") }}
				</v-btn>
				<v-btn color="primary"
					   :disabled="isItemsLoadingState"
					   @click="createItem">
					{{ $t("buttons.create") }}
				</v-btn>
			</div>
		</template>
		<template #search>
			<v-text-field
					:ref="searchTextFieldRef"
					v-model="searchQuery"
					autocomplete="off"
					append-icon="mdi-magnify"
					:label="$t('fields.search')"
					:rules="validation.searchQuery"
					clearable
					single-line/>
		</template>
		<template #content>
			<list-container>
				<v-row>
					<v-col class="py-0" cols="12">
						<v-data-table disable-filtering
									  :headers="headers"
									  :loading="isItemsLoadingState"
									  :loading-text="$t('tables.loading')"
									  :options.sync="options"
									  :footer-props="footerOptions"
									  must-sort
									  :items="items"
									  item-key="id">
							<template v-slot:[`item.completed`]="{ item }">
								{{ getCompletedStatus(item.completed) }}
							</template>
							<template v-slot:[`item.actions`]="{ item }">
								<v-icon @click="editItem(item)"
										class="mr-2">
									mdi-pencil
								</v-icon>
								<v-icon @click="deleteTodo(item)">
									mdi-delete
								</v-icon>
							</template>
						</v-data-table>
					</v-col>
				</v-row>
			</list-container>
		</template>
		<template #no-data>
			<list-no-data @createItem="createItem">
				<template #text>{{ $t("emptyData.notTodos") }}</template>
			</list-no-data>
		</template>
	</list-layout>
</template>

<script>
import ListContainer from "@/components/layouts/ListContainer";
import ListLayout from "@/components/layouts/ListLayout";
import ListNoData from "@/components/common/ListNoData";
import { listMixin } from "@/mixins/listMixin";
import routeNames from "@/router/routeNames";
import { getterTypes, actionTypes } from "@/store/modules/todos/types";
import { createNamespacedHelpers } from "vuex";
import { namespace } from "@/store/modules/todos";
import colorsMixin from "@/mixins/colorMixin";

const { mapActions, mapGetters } = createNamespacedHelpers(namespace);

export default {
	mixins: [listMixin, colorsMixin],
	data() {
		return {
			namespace,
			headers: [
				{ text: this.$t("tables.todos.userId"), value: "userId" },
				{ text: this.$t("tables.todos.title"), value: "title" },
				{ text: this.$t("tables.todos.completed"), value: "completed" },
				{ text: this.$t("tables.shared.actions"), value: "actions", sortable: false, width: "10%" }
			]
		};
	},
	computed: {
		...mapGetters({
			items: getterTypes.filteredFormattedItems,
			isNoData: getterTypes.isListingEmpty
		})
	},
	methods: {
		...mapActions({
			initializeStore: actionTypes.initialize,
			destroyStore: actionTypes.destroy,
			deleteTodo: actionTypes.deleteTodo,
			save: actionTypes.save
		}),
		getCompletedStatus(status) {
			return this.$t(`tables.todos.status.${status ? "completed" : "processed"}`);
		},
		editItem({ id }) {
			this.$router.push({ name: routeNames.todo.edit, params: { id } });
		},
		createItem() {
			this.$router.push({ name: routeNames.todo.create });
		}
	},
	async created() {
		await this.initializeStore();
	},
	beforeDestroy() {
		this.destroyStore();
	},
	components: {
		ListLayout,
		ListContainer,
		ListNoData
	}
};
</script>


