<template>
	<v-container fluid class="ma-0 pa-0">
		<alert-snackbar :text="errorAlert.text"
						   @close="onCloseErrorAlert(index)"
						   color="error"
						   :timeout="errorAlert.timeout"
						   v-for="(errorAlert, index) in errorAlerts"
						   :key="index">
		</alert-snackbar>
		<alert-snackbar :text="infoAlert.text"
						   @close="onCloseInfoAlert(index)"
						   color="info"
						   :timeout="infoAlert.timeout"
						   v-for="(infoAlert, index) in infoAlerts"
						   :key="index">
		</alert-snackbar>
	</v-container>
</template>

<script>
import AlertSnackbar from "@/components/alerts/AlertsSnackbar";
import { createNamespacedHelpers } from "vuex";
import { namespace } from "@/store/modules/alerts";
import alertTypes from "@/store/modules/alerts/types";
const { mapState, mapMutations } = createNamespacedHelpers(namespace);

export default {
	computed: {
		...mapState({
			errorAlerts: state => state.errorAlerts,
			infoAlerts: state => state.infoAlerts
		})
	},
	methods: {
		...mapMutations({
			onCloseErrorAlert: alertTypes.mutationTypes.REMOVE_ERROR_ALERT,
			onCloseInfoAlert: alertTypes.mutationTypes.REMOVE_INFO_ALERT
		})
	},
	components: {
		AlertSnackbar
	}
};
</script>
