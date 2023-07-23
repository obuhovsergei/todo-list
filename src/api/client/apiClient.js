import { i18n } from "@/plugins/index";
import axios from "axios";
import { getHeaders } from "@/api/config/headers";
import { processApiPayload } from "@/utils/api";

class ApiClient {
	constructor() {
	}
	
	async get({ url, responseType }) {
		try {
			const dateBeforeRequest = Date.now();
			console.log(i18n.t("logs.info.request", { url }));
			
			let { data } = await axios.get(`${url}`, {
				headers: getHeaders(),
				responseType
			});
			
			console.log(i18n.t("logs.info.response", { url }), `time: ${Date.now() - dateBeforeRequest}ms`, data);
			
			return data;
		} catch (e) {
			console.error(i18n.t("logs.error.requestError"), e);
			throw e;
		}
	}
	
	async put({ url, payload }) {
		if(payload)
			processApiPayload(payload);
		
		try {
			console.log(i18n.t("logs.info.request", { url }), payload);
			let { data } = await axios.put(url, payload, {
				headers: getHeaders()
			});
			
			console.log(i18n.t("logs.info.response", { url }), data);
			
			return data;
		} catch (e) {
			console.error(i18n.t("logs.error.requestError"), e);
			throw e;
		}
	}
	
	async delete({ url }) {
		try {
			console.log(i18n.t("logs.info.request", { url }));
			
			let { data } = await axios.delete(url, {
				headers: getHeaders()
			});
			
			console.log(i18n.t("logs.info.response", { url }), data);
			
			return data;
		} catch (e) {
			console.error(i18n.t("logs.error.requestError"), e);
			throw e;
		}
	}
	
	async post({ url, payload, headers }) {
		if(payload)
			processApiPayload(payload);
		
		try {
			console.log(i18n.t("logs.info.request", { url }), payload);
			
			let { data } = await axios.post(url, payload, {
				headers: {
					...getHeaders(),
					...headers
				}
			});
			
			console.log(i18n.t("logs.info.response", { url }), data);
			
			return data;
		} catch (e) {
			console.error(i18n.t("logs.error.requestError"), e);
			throw e;
			
		}
	}
}

export default new ApiClient();

