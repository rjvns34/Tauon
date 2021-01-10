import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  public id: number;
  public backgroundColor: string;

  constructor(public settingService: SettingService) {
    this.id = settingService.getSidebarImageIndex() + 1;
    this.backgroundColor = settingService.getSidebarColor(); 
   }

  ngOnInit(): void {
    this.settingService.sidebarImageIndexUpdate.subscribe((id:number) => {
      this.id = id + 1;
    });
    this.settingService.sidebarColorUpdate.subscribe((color:string) => {
      this.backgroundColor = color;
    });
  }

  ngOnDestroy(){
    this.settingService.sidebarImageIndexUpdate.unsubscribe();
    this.settingService.sidebarColorUpdate.unsubscribe();
  }
}
