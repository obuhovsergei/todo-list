const defaultTimeout = 4000; // мс

export default class AlertModel {
	constructor({ text, timeout }) {
		this.text = text;
		this.timeout = timeout || defaultTimeout;
	}
}
