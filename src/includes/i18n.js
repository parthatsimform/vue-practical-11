import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import gu from "../locales/gu.json";
import hi from "../locales/hi.json";

export default createI18n({
	locale: "en",
	fallbackLocale: "en",
	messages: {
		en,
		fr,
		gu,
		hi,
	},
});
