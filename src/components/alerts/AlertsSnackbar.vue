<template>
	<v-snackbar v-model="isShown" elevation="0" :color="color" :timeout="timeout"
				:absolute="absolute" :right="right">
		{{ text }}
		<template v-slot:action="{ attrs }">
			<v-btn icon
				   v-if="closable"
				   v-bind="attrs"
				   @click="close">
				<template>
					<v-icon>mdi-close</v-icon>
				</template>
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
export default {
	props: {
		color: String,
		text: String,
		timeout: Number,
		closable: {
			default: true
		},
		absolute: {
			default: false
		},
		right: {
			default: false
		}
	},
	data() {
		return {
			isShown: true
		};
	},
	watch: {
		isShown(newValue) {
			if(!newValue) {
				this.close();
			}
		}
	},
	methods: {
		close() {
			this.$emit("close");
		}
	}
};
</script>

<style scoped>
.v-snack__wrapper {
  min-width: unset;
}
</style>
