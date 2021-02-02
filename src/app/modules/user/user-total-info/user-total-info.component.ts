import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Installation } from 'src/app/models/installation';
import { User } from 'src/app/models/user';
import { NodeService } from 'src/app/services/node.service';
import { UserService } from '../../../services/user.service';
import { Chart } from 'node_modules/chart.js'
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

  nodeTimestamp: any[]=[];
  nodeTimestampStatus: any[]=[];
  
  getNodeGraph(masterId){
    const date = new Date();
    const latest_date = this.datePipe.transform(date, 'yyyy-MM-dd hh:mm');
  
    const pd = date.setDate(date.getDate() - 2);
    const previous_date = this.datePipe.transform(pd, 'yyyy-MM-dd 00:00');
    
    // console.log(latest_date );
    // console.log(previous_date);
    
    // this.getDateDifference(latest_date,previous_date);
    // this.nodeTimestampStatus.length = 0;
    // this.nodeTimestampStatus.length = 0;
        
    $('#nodeChartModal').modal('show');
    if(this.nodeTimestamp.length<1 || this.nodeTimestampStatus.length<1){
      $('#chartLoader').show();
    }
    else{
      $('#chartLoader').hide();
    }
    return this.nodeService.getNodeDetails().pipe(first()).subscribe(data => {
      
      
      const timeStamp = data["usersDetails"][0]["timeStamp"];
      // const timestampStatus = data["usersDetails"]
      console.log(timeStamp);
      // for (var val of timeStamp) {
    
      //   this.nodeTimestamp.push(val.timestamp);
      //   this.nodeTimestampStatus.push(val.status)
      // }
      // console.log(timeStamp);
      
      var nodeChart = new Chart("nodeChart", {
        type: 'line',
        data: {
            labels: timeStamp,
            datasets: [{
                label: 'Node Status Chart',
                fill: false,
                steppedLine: true,
                data: [0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,1],
                // data: this.nodeTimestampStatus,
                backgroundColor:'rgba(0, 0, 0, 0.2)', 
                // [
                //     'rgba(0, 0, 0, 0.2)'
                // ],
                borderColor:'rgba(0, 0, 0, 1)', 
                // [
                //      'rgba(0, 0, 0, 1)'
                // ],
                borderWidth: 1,          
            }]
        },
        options: {
            scales: {
                xAxes: [{
                  type:'time',
                    ticks: {
                      maxTicksLimit: 30,
                      autoSkip: true,
                    }
                }],
                yAxes: [{
                  ticks: {
                    beginAtZero: true,          
                    stepSize: 40
                  }
                }],
            }
        }
    });
    $('#chartLoader').hide();
        // this.nodeTimestampStatus.length = 0;
    // this.nodeTimestampStatus.length = 0; 
  });
    
  }

  // getDateDifference(startDate, endDate){

  //   console.log(startDate,endDate);
  //   const dateArray = new Array();
  //   const currentDate = startDate;
    
  //   while (currentDate <= endDate) {
  //     dateArray.push(currentDate);
      
  //   }
  // }
}
