import { cloneDeep, pick } from "lodash";

export default class StateSnapshotService {
	constructor() {
		this.values = {};
	}
	
	get(key) {
		return cloneDeep(this.values[key]);
	}
	
	prepareSnapshot(state, fields) {
		return pick(state, fields);
	}
	
	set(key, value) {
		this.values[key] = cloneDeep(value);
	}
}
