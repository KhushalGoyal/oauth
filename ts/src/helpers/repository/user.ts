import { Types } from "mongoose";
import { Projections } from "../projections";
import { UserEntity } from "../entities/user";
import { UserModule } from "../../models";

export class UsersRepository {
    async save(payload: UserEntity): Promise<UserEntity> {
        return UserModule.create(payload);
    }
    async findById(id: string): Promise<UserEntity> {
        return UserModule.findById(id).lean() as any;
    }
    async findByUserName(username: string): Promise<UserEntity> {
        return UserModule.findOne({ username }).lean() as any;
    }

    async tokenPayload(username: string): Promise<UserEntity> {
        return UserModule.findOne({ username }, Projections.Users.TokenPayload).lean() as any;
    }
    async updateLogout(userId: string): Promise<any> {
        return UserModule.findByIdAndUpdate({ _id: new Types.ObjectId(userId) }, { $set: { lastLogoutTime: new Date() } });
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return UserModule.findOne({ email }).lean() as any;
    }

    async update(id: string, payload: UserEntity): Promise<void> {
        return UserModule.updateOne({ _id: new Types.ObjectId(id) }, { $set: payload }).lean() as any;
    }
    async getTokenPayload(id: string): Promise<UserEntity> {
        return UserModule.findById(id).select(Projections.Users.TokenPayload).lean() as any as UserEntity;
    }

    async isLoginEnabled(pid: string): Promise<UserEntity> {
        return UserModule.findOne({ _id: new Types.ObjectId(pid), loginEnabled: true }).lean() as any;
    }

    async getPrimaryUserByEntityId(entity: string): Promise<UserEntity> {
        return UserModule.findOne({ entity: new Types.ObjectId(entity), isDefault: true }).lean() as any;
    }
}
