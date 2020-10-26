export class BaseEntity {
    _id: string;
    id: string;
    entity?: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}
