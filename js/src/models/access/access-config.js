"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Access = void 0;
const entities_1 = require("../../helpers/entities");
class Access extends entities_1.BaseEntity {
}
exports.Access = Access;
// export const accessRights = {
//     'ADMIN' : {
//         canread : true,
//         canwrite : true,
//         canupdate : true
//     },
//     'USER' : {
//         canread : true,
//         canwrite : false,
//         canupdate : false
//     }
// }
// const serviceCodeList = {
//     home : 'HOME',
//     horoscope : 'HOROSCOPE'
// }
// export const serviceList : Array<Services> = [{
//     name : 'Home',
//     code : serviceCodeList.home,
//     access : accessRights['ADMIN']
// },{
//     name : 'Horoscope',
//     code : serviceCodeList.horoscope,
//     access : accessRights['ADMIN']
// }]
// export const adminDefaultModulesList : Array<Modules> = [{
//     name : 'Dashboard',
//     code : 'DASHBOARD',
//     isEnable : true,
//     services : serviceList    
// }]
// export const adminDefaultRole : Access = {
//     name : 'Super Admin',
//     type : 'ADMIN',
//     modules : adminDefaultModulesList
// }
//# sourceMappingURL=access-config.js.map