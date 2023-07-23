<template>
	<v-container class="pa-6" fluid>
		<v-row :align="align" :justify="justify">
			<v-col :sm="sm" :lg="lg" :md="md" :xl="xl"
				   :offset-md="offset.md">
				<v-row>
					<v-col cols="12" sm="8">
						<h1 class="d-inline-block">
							<slot name="title"></slot>
						</h1>
					</v-col>
					<v-col cols="12" sm="4" class="d-flex justify-end">
						<slot name="breadcrumbs"></slot>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row :align="align" :justify="justify">
			<v-col cols="12" :lg="lg" :md="md" :sm="sm" :xl="xl"
				   :offset-md="offset.md">
				<slot name="content"></slot>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: {
		xl: {
			default: 8
		},
		lg: {
			default: 8
		},
		md: {
			default: 10
		},
		sm: {
			default: 12
		},
		align: {
			default: "start"
		},
		justify: {
			default: "center"
		},
		offset: {
			default: () => {
				return {
					md: 1
				};
			}
		}
	}
};
</script>

<style scoped>

</style>
