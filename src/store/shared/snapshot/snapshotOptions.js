export default class SnapshotOptions {
	/**
	 * @param {String} key
	 * @param {String[]} Fields
	 */
	constructor({ key, fields }) {
		this.key = key;
		this.fields = fields;
	}
}
