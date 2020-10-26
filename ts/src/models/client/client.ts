import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import { ClientsEntity } from "../../helpers/entities";
import { ClientTypes } from "../../../configs";

const ClientSchema = new Schema<ClientsEntity>({
    name: { type: String, index: true, required: true },
    type: { type: String, enum: [ClientTypes.HOROSCOPE,ClientTypes.DESERT_CO, ClientTypes.PORTAL], default: ClientTypes.HOROSCOPE, required: true },
    clientId: { type: String, index: true },
    clientSecret: { type: String, index: true },
    redirectUris: { type: Array, index: true },
    grants: { type: Array, index: true },
    userTypes: [{ type: String }],
});

ClientSchema.plugin(MongoosePaginate);
export const ClientsModel = model('clients', ClientSchema);
