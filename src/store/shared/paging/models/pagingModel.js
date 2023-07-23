export default class PagingModel {
	constructor({ total, page, pageSize }) {
		this.total = total;
		this.page = page;
		this.pageSize = pageSize;
	}
}
