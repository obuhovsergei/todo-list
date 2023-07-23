import Vue from "vue";
import ruLang from "vuetify/es5/locale/ru";
import VueI18n from "vue-i18n";
import locales from "@/plugins/i18n/locales";

Vue.use(VueI18n);

const ruLocaleAlias = "ru";
const enLocaleAlias = "ru";

const getLocale = (lang, lcs) => {
	let locale = {};
	
	if(Object.prototype.hasOwnProperty.call(lcs, lang)) {
		locale = lcs[lang];
	} else {
		Object.keys(lcs).forEach((key) => {
			locale[key] = getLocale(lang, lcs[key]);
		});
	}
	
	return locale;
};

const messages = {
	ru: Object.assign({}, getLocale(ruLocaleAlias, locales), ruLang)
};

export default new VueI18n({
	locale: ruLocaleAlias,
	fallbackLocale: enLocaleAlias,
	messages
});
