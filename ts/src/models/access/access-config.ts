import { BaseEntity } from "../../helpers/entities"

export interface Modules {
    name : String,
    code : String,
    isEnable : Boolean
    services : Array<Services>
}

export interface Services {
    name : String,
    code : String,
    access : {
        canread : Boolean,
        canwrite : Boolean,
        canupdate : Boolean
    }
}

export class Access extends BaseEntity {
    name : string;
    type : string;
    clientId : string;
    role : string;
    modules : Array<Modules>
}

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

