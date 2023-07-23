import colors from "vuetify/lib/util/colors";

const colorsMixin = {
	computed: {
		colors() {
			return {
				primary: this.$vuetify.theme.currentTheme.primary,
				secondary: this.$vuetify.theme.currentTheme.secondary,
				white: this.$vuetify.theme.currentTheme.white,
				...colors
			};
		}
	}
};

export default colorsMixin;
