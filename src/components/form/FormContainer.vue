<template>
	<v-container fluid class="pa-0">
		<slot></slot>
		<bottom-space height="48"></bottom-space>
	</v-container>
</template>

<script>
import BottomSpace from "@/components/layouts/BottomSpace";

export default {
	components: { BottomSpace }
};
</script>
