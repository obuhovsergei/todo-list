<template>
	<v-app>
		<v-app-bar app
				   :clipped-left="$vuetify.breakpoint.lgAndUp"
				   elevation="2"
				   color="white">
			<v-toolbar-title class="font-weight-bold text-h5 primary--text">
				<span>{{ $t("titles.home.title") }}</span>
			</v-toolbar-title>
			<v-spacer/>
			<template class="text-right d-flex justify-end align-center">
				<v-switch v-model="isRealData" hide-details :loading="isLoading"
						  :label="$t('fields.home.data', { type: isRealData ? $t('fields.home.realData'): $t('fields.home.fakeData') })"/>
			</template>
		</v-app-bar>
		<v-main class="primary lighten-3">
			<v-container fluid class="pa-0 pa-md-3 wide-full-height-main">
				<router-view :key="$route.meta.key || $route.name"/>
				<alerts/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Alerts from "@/components/alerts/Alerts";
import colorsMixin from "@/mixins/colorMixin";
import { actionTypes, namespace } from "@/store/modules/home/types";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers(namespace);

export default {
	mixins: [colorsMixin],
	computed: {
		...mapState({
			isRealDataExternal: state => state.isRealData,
			isLoading: state => state.isLoading
		}),
		isRealData: {
			get() {
				return this.isRealDataExternal;
			},
			set(value) {
				this.switchData(value);
			}
		}
	},
	methods: {
		...mapActions({
			initializeStore: actionTypes.initialize,
			switchData: actionTypes.switchData
		})
	},
	async created() {
		await this.initializeStore()
	},
	components: { Alerts }
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/components/VToolbar/_variables.scss";
@import "~vuetify/src/styles/settings/_variables.scss";

.wide-full-height-main {
  min-height: calc(100vh - (#{$toolbar-content-padding-y} * 2) - #{$toolbar-btn-icon-size} - 8px);

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
	min-height: calc(100vh - (#{$toolbar-content-padding-y} * 2) - #{$toolbar-btn-icon-size});
  }
}
</style>
