export interface Vehicles{
    "id":string,
    "state":string,
    "routeCommitId"?:null,
    "seats":number,
    "class"?:{
       "name":string
    },
    "location":{
       "lat": number,
       "lng": number,
       "bearing"?: number
    },
    "distance": number
}