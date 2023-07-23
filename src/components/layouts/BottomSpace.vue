<template>
	<v-sheet :height="height" style="background-color: inherit"></v-sheet>
</template>

<script>
export default {
	props: {
		height: {
			default: 96,
			type: [Number, String]
		}
	}
};
</script>
