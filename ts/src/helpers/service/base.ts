import { Types } from "mongoose";
import { EntityTokenPayload } from "../tokenPayload";
import { BaseEntity } from "../entities";
import { RequestQuery, Pagination } from "./requestQuery";
import { PaginatedResponse } from "../response/pagination";

export abstract class BaseService {
    public currentUser: EntityTokenPayload;
    constructor(user: EntityTokenPayload) {
        this.currentUser = user;
        this.currentUser._id = new Types.ObjectId(user._id as any) as any;
    }
}

export abstract class AbstractService<E extends BaseEntity> extends BaseService {
    public create(body: E): Promise<E>| E {
        const { currentUser } = this;
        body.createdBy = currentUser._id;
        body.updatedBy = currentUser._id;
        if (currentUser.entity) body.entity = currentUser.entity;
        return body as E;
    }
    public abstract get(id: string): Promise<E>| E;
    public update?(id: string, body: E): Promise<E>| E;
    public delete?(id: string): Promise<void>| void;
    public abstract getAll(filter: RequestQuery<E>): Promise<PaginatedResponse>| PaginatedResponse;
    public toEntity?(dto: E): E;
    public toDTO?(entity: E): E;
    public getQuery(query: RequestQuery<E>): RequestQuery<E> {
        const result = new RequestQuery<E>();
        result.pagination = this.getPaginationQuery(query.pagination);
        result.sort = this.getSortQuery(query.sort);
        result.filter = this.getFilterQuery(query.filter as any as string);
        return result;
    }

    private getPaginationQuery(query: any): Pagination {
        const pagination = new Pagination();
        pagination.page = query && query.page ? Number.parseInt(query.page.toString(), 10) : 1;
        pagination.limit = query && query.limit ? Number.parseInt(query.limit.toString(), 10) : 10;
        return pagination;
    }
    private getSortQuery(query: string): any {
        if (query) return JSON.parse(query);
        return {} as any;
    }

    private getFilterQuery(query: any): E {
        if (!query) return {} as E;
        query = JSON.parse(query) as E;
        if (query.name && (query.name !== '')) query.name = { $regex: query.name, $options: "i" };
        return query;
    }
}
