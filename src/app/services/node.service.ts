import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Node } from '../models/node';
import { RequiredData } from '../helpers/requiredData';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  
  // private currentUserSubject : BehaviorSubject<Node>;
  // public currentMacId : Observable<Node>;

  constructor(private http: HttpClient) {
    
   }

  getMasterId(node:any){
        
    const headers = {'Authorization':RequiredData.authorization}
    const body = { "macId": [node] }
    return this.http.post(RequiredData.baseUrl+'get/master/array/macid/',body,{headers})
    .pipe(map(masterIds => {
  
      return masterIds
    }))
  }

  //{{dev_flexa}}/add/Installation/room/endpoints/
  
  getEndpointId(masterId: any){
    const headers = {'Authorization':RequiredData.authorization}
    
    return this.http.get(RequiredData.baseUrl+'get/endpointids/mastertable/'+masterId,{headers})
    .pipe(map(endPointId =>{
      console.log(endPointId);
      return endPointId
    }))
  }

  submitInstallationInfo(data,uId,masterId,endPointId1,endPointId2,endPointId3,endPointId4){
    // console.log(uId + masterId +);
    console.log(uId + masterId + endPointId1 + endPointId2 + endPointId3 + endPointId4);
    
    // this.uId + this.masterId + this.endPointId1 + this.endPointId2 + this.endPointId3 + this.endPointId4
    const headers = {'Authorization':RequiredData.authorization}
    const body = { "userid": uId, "masternodeId": masterId, "ssid": "Tauon",
                   "ipAddress": "192.168.1.135", "installationTitle": data.installationName, "installationIcon": 60223,
                   "roomTitle": data.roomName, "roomIcon": 60227, 
                   "endpoints": [
                     {"endpointId": endPointId1, "endpointTitle": data.endPoint1, "endpointIcon": 58162, "endpointType": data.type1, "endpointStatus": 0},
                     {"endpointId": endPointId2, "endpointTitle": data.endPoint2, "endpointIcon": 58162, "endpointType": data.type2, "endpointStatus": 0},
                     {"endpointId": endPointId3, "endpointTitle": data.endPoint3, "endpointIcon": 58162, "endpointType": data.type2, "endpointStatus": 0},
                     {"endpointId": endPointId4, "endpointTitle": data.endPoint4, "endpointIcon": 58162, "endpointType": data.type2, "endpointStatus": 0}
                   ] }
                   
      console.log("data @ service "+body);
                   
    return this.http.post(RequiredData.baseUrl+'add/Installation/room/endpoints/',[body],{headers})
    .pipe(map(response => {
      console.log(response);
      
    }))
  }

//   [
//     {
//         "userid": "US_30126aea-fe71-403c-bf1b-befef2e838d7",
//         "masternodeId": "MS_e803f60f-21bf-4a31-a3c8-d0aac8061781",
//         "ssid": "Tauon",
//         "ipAddress": "192.168.1.135",
//         "installationTitle": "Test",
//         "installationIcon": 60223,
//         "roomTitle": "Tauon",
//         "roomIcon": 60227,
//         "endpoints": [
           
//             {
//                 "endpointId": "EP_9f5d1672-94f4-4006-beb2-eeb9750358bb",
//                 "endpointTitle": "Fan5",
//                 "endpointIcon": 58162,
//                 "endpointType": "Dimmer",
//                 "endpointStatus": 0
//             },
//             {
//                 "endpointId": "EP_07c15475-b216-47f6-8eaa-90be895545a5",
//                 "endpointTitle": "Fan6",
//                 "endpointIcon": 58162,
//                 "endpointType": "Dimmer",
//                 "endpointStatus": 0
//             },
//             {
//                 "endpointId": "EP_c3047352-1d77-45d1-9a02-b941c4f87791",
//                 "endpointTitle": "LED7",
//                 "endpointIcon": 57951,
//                 "endpointType": "Switch",
//                 "endpointStatus": 0
//             },
//             {
//                 "endpointId": "EP_177c582f-d88c-4089-a020-f2ae2aeb895b",
//                 "endpointTitle": "LED8",
//                 "endpointIcon": 57951,
//                 "endpointType": "Switch",
//                 "endpointStatus": 0
//             }
//         ]
//     }
// ]

}
