import _ from "lodash";

export const searchObjectByKeys = (arr, keys, query) => {
	if(!query) return arr;
	
	query = query.toLowerCase();
	return arr.filter(obj => keys.map(key => {
		let value = _.get(obj, key);
		return value ? value.toLowerCase().includes(query) : false;
	}).some(el => el));
};
