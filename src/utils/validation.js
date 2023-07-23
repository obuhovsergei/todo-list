import i18n from "@/plugins/i18n";

export const prepareMaxLengthRule = ({ maxLength }) => {
	return v => !v || v.length <= maxLength || `${i18n.t("validation.maxNumber", { number: maxLength })} ${i18n.t("validation.symbols")}`;
};

export const requiredRule = () => {
	return v => !!v && !/^[\s]+$/.test(v) || i18n.t("validation.required");
};

export const onlyNumbersRule = () => {
	return v => !v || /^\d+$/.test(v) || i18n.t("validation.validOnlyNumbers");
};

export const maxLengths = {
	search: 50,
	title: 200
};
