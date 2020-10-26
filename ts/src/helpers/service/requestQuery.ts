import { BaseEntity } from "../entities";

export class RequestQuery<F extends BaseEntity> {
    filter: F;
    pagination: Pagination;
    sort: any
}

export class Pagination {
    limit: number | string;
    page: number | string;
}
