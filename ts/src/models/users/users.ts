import { Schema, model, Types } from "mongoose";

const UsersSchema = new Schema({
    /** optional if required in payload set profileId as pid */
    pid: { type: Types.ObjectId, index: true },
    userType: { type: String, required: true },
    email: { type: String, required: true} ,
    username: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true, index: true },
    lastLoginTime: { type: Date },
    lastLogoutTime: { type: Date },
    active : { type : Boolean},
    allowedClients : { type : Array },
    loginEnabled : { type : Boolean },
    verified : { type : Boolean },

}, { timestamps: true });

UsersSchema.index({ createdAt: 1 });
UsersSchema.index({ updatedAt: 1 });

export const UserModule = model('users', UsersSchema);
