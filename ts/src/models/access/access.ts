import { Schema, model, Types } from "mongoose";
import { trim } from "lodash";
import { UserTypes } from "../../../configs";

const AccessModuleSchema = new Schema({
    name: { type : String, index : true},
    type: { type : String, index : true},
    clientId : { type : Types.ObjectId, index : true},
    role : { type : String, enum : [ UserTypes.SUPER_ADMIN, UserTypes.ADMIN, UserTypes.USER ], default : UserTypes.USER, index: true},
    modules : [{
        name : String,
        code : String,
        isEnable : Boolean,
        services : [{
            name : String,
            code : String,
            access : {
                canread : Boolean,
                canwrite : Boolean,
                canupdate : Boolean
            }
        }] 
    }]
}, { timestamps: true });

export const AccessModule = model("access", AccessModuleSchema);