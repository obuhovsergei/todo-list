import Vue from "vue";
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import ru from "vuetify/es5/locale/ru";

Vue.use(Vuetify);

const theme = {
	primary: {
		base: "#1460D1",
		lighten1: "#D7E4FF",
		lighten2: "#EAF2FF",
		lighten3: "#FBFCFD"
	},
	secondary: {
		base: "#101824",
		lighten1: "#546072",
		lighten2: "#97A1B0"
	},
	white: {
		base: "#FFFFFF",
		darken1: "#F7F8FA"
	}
};

export default new Vuetify({
	theme: {
		options: {
			customProperties: true
		},
		themes: {
			light: theme
		}
	},
	lang: {
		locales: { ru },
		current: "ru"
	}
});
