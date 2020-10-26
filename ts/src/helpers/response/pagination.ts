export class PaginatedResponse {
    private page: number;
    private pages: number;
    private total: number;
    private results: Array<any>;
    private limit: number;
    private nextPage: number;
    private prevPage: number;
    private hasNextPage: number;
    private hasPrevPage: number;
    private constructor(response: any) {
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

    public static getResponse(response: any): PaginatedResponse {
        return new PaginatedResponse(response);
    }
}