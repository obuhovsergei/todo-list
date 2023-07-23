export default class TodosStateModel {
    constructor({ listing, sorting, paging, search }) {
        this.listing = listing;
        this.sorting = sorting;
        this.paging = paging;
        this.search = search;
    }
}
