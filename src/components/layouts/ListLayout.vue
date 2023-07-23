<template>
	<v-container class="pa-6" fluid>
		<v-row>
			<v-col cols="12" md="10" xl="10" offset-md="1">
				<v-container fluid class="pa-0 ma-0">
					<v-row>
						<v-col cols="12" sm="8" lg="10" class="d-flex justify-space-between align-center">
							<h1>
								<slot name="title"></slot>
							</h1>
							<slot name="actions" v-if="!isNoData"></slot>
						</v-col>
						<v-col cols="12" sm="4" lg="2" v-if="!isNoData">
							<slot name="search"></slot>
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-row>
		<v-row v-if="!isNoData">
			<v-col cols="12" md="10" xl="10" offset-md="1">
				<slot name="content"></slot>
			</v-col>
		</v-row>
		<v-row v-else>
			<v-col cols="12" md="10" xl="6" class="mx-auto">
				<slot name="no-data"></slot>
			</v-col>
		</v-row>
		<bottom-space v-if="!isNoData"></bottom-space>
	</v-container>
</template>

<script>
import BottomSpace from "@/components/layouts/BottomSpace";

export default {
	components: {
		BottomSpace
	},
	props: {
		isNoData: Boolean
	}
};
</script>
