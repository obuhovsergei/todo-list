<template>
	<form-container>
		<v-card outlined class="border--primary-lighten-2 rounded-lg elevation-0 mt-4 px-6 pa-4">
			<v-row>
				<v-col  cols="12">
					<v-skeleton-loader type="heading" class="px-0 mb-6 py-4"/>
				</v-col>
				<v-col cols="12" v-for="(_, i) of new Array(2)" :key="i">
					<v-skeleton-loader width="100%"
									   :height="50"
									   class="mb-9 rounded-br-lg"
									   type="image"/>
				</v-col>
			</v-row>
		</v-card>
	</form-container>
</template>

<script>
import FormContainer from "@/components/form/FormContainer";

export default {
	components: { FormContainer}
};
</script>
