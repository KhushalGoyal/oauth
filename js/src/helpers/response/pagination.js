"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponse = void 0;
class PaginatedResponse {
    constructor(response) {
        this.page = response.page;
        this.pages = response.totalPages;
        this.total = response.totalDocs;
        this.results = response.docs;
        this.limit = response.limit;
        this.nextPage = response.nextPage;
        this.prevPage = response.prevPage;
        this.hasNextPage = response.hasNextPage;
        this.hasPrevPage = this.page == 1 ? false : response.hasPrevPage;
    }
    static getResponse(response) {
        return new PaginatedResponse(response);
    }
}
exports.PaginatedResponse = PaginatedResponse;
//# sourceMappingURL=pagination.js.map