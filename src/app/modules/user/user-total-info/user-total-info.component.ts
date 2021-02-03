import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Installation } from 'src/app/models/installation';
import { User } from 'src/app/models/user';
import { NodeService } from 'src/app/services/node.service';
import { UserService } from '../../../services/user.service';
import { Chart } from 'node_modules/chart.js'
// import { Chart } from 'chart.js';
declare var $: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-total-info',
  templateUrl: './user-total-info.component.html',
  styleUrls: ['./user-total-info.component.css']
})
export class UserTotalInfoComponent implements OnInit {
  installationDetails: Installation[] = [];
  nodeDetails:Node[] = [];

  userId = localStorage.getItem('userIdForGetData'); //here we get the userId which is set at UsersDataComponent.



  constructor( private router: Router, private userService: UserService, 
               private nodeService: NodeService,
               private datePipe : DatePipe) { }

  ngOnInit(): void {  
    /**Call function when page load */
    this.getUsersTotalInfo(this.userId);
  }

/** Here we get the total info about paticular userId which store in session */
  getUsersTotalInfo(userId){    
    return this.userService.userTotalDetails(userId)
    .pipe(first()).subscribe(data => {
      
      const installationDetails = data["user_info"][1]["installations"]; //Installation Details.
      const nodeDetails = data["user_info"][3]["nodes"] //Node details.
      
      this.installationDetails = installationDetails; 
      this.nodeDetails = nodeDetails;
      // console.log(nodeDetails)
    })
  }

  /** This function is for remove session and redirect to the userInfo page on Back button click.*/
  onBack(){
    localStorage.removeItem('userIdForGetData');
    this.router.navigateByUrl('/dashboard/userInfo');
  }

  
  nodeTimestamp;
  nodeTimestampStatus: any[]=[];
  color=[]

  getNodeGraph(masterId){
        
 

    $('#nodeChartModal').modal('show');
    // if(this.nodeTimestamp.length<1 || this.nodeTimestampStatus.length<1){
    //   $('#chartLoader').show();
    // }
    // else{
    //   $('#chartLoader').hide();
    // }

    return this.nodeService.getNodeDetails().pipe(first()).subscribe(data => {
      
      
      const timeStamp = data["usersDetails"][0]["timeStamp"];
      const timestampStatus = data["usersDetails"][0]["status"];
      
      // console.log(timeStamp);
      
      // for (var index in timestampStatus) {
      //   if(timestampStatus[index] == "1"){
      //     this.color.push('green')
      //   }
      //   else{
      //     this.color.push('red')
      //   }
      // }

        var lineChart = new Chart("nodeChart", {
        type: 'line',
        data: {
            labels: timeStamp,
            datasets: [{
                label: 'Node Status Chart',
                fill: false,
                steppedLine: false,
                data: timestampStatus,
                
                backgroundColor:'rgba(0, 0, 0, 0.2)',
                //  [
                //     'rgba(0, 0, 0, 0.2)'
                // ],
                borderColor:'black',
                //  [
                //      'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                //     'rgba(0, 0, 0, 1.0)'
                // ],
                borderWidth: 2,
                
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    // type: 'time',
                    // distribution: 'series',
                    ticks: {
                        beginAtZero: true,
                        max: '2021-02-02 16:29',
                        
                    }
                }],
                yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      max: 1,
                      min: 0,
                      stepSize: 1.0,
                      
                  }
              }]
            }
        }
    });

    
    $('#chartLoader').hide();
        // this.nodeTimestampStatus.length = 0;
    // this.nodeTimestampStatus.length = 0; 
  });
    
  }

}
