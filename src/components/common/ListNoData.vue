<template>
	<v-container class="pa-0 wide-full-height" fill-height>
		<v-row>
			<v-col class="d-flex align-center flex-column">
				<span class="body-1 grey--text text-center">
					<slot name="text"></slot>
				</span>
				<v-btn @click="$emit('createItem')" color="primary" class="mt-4">
					<v-icon left size="23">mdi-plus</v-icon>
					<span>{{ $t("buttons.add") }}</span>
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/components/VToolbar/_variables.scss";
@import "~vuetify/src/styles/settings/_variables.scss";

.wide-full-height {
  height: calc(100vh - 72px - (#{$grid-gutter} * 2) - (#{$toolbar-content-padding-y} * 2) - #{$toolbar-btn-icon-size} - 8px - 24px);

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
	height: calc(100vh - 72px - (#{$grid-gutter} * 2) - (#{$toolbar-content-padding-y} * 2) - #{$toolbar-btn-icon-size});
  }
}
</style>
