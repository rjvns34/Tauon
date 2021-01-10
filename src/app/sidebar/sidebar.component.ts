import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar-routes.config';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public normalFontColor: string;
  public dividerBgColor: string;
  public menuItems: object;
  public color: string;
  public activeFontColor: string;


  constructor(public settingService:SettingService) { 
    this.normalFontColor = 'rgba(255,255,255,.8)';
    this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
    this.menuItems = ROUTES;
    this.activeFontColor = 'rgba(0,0,0,.6)';
  }

  ngOnInit(): void {
    this.color = this.settingService.getSidebarFilter();
    this.settingService.sidebarFilterUpdate.subscribe((filter: string) => {
      this.color = filter;
      if (filter === '#fff') {
        this.activeFontColor = 'rgba(0,0,0,.6)';
      }else {
        this.activeFontColor = 'rgba(255,255,255,.8)';
      }
    });
    this.settingService.sidebarColorUpdate.subscribe((color: string) => {
      if (color === '#fff') {
        this.normalFontColor = 'rgba(0,0,0,.6)';
        this.dividerBgColor = 'rgba(0,0,0,.1)';
      }else {
        this.normalFontColor = 'rgba(255,255,255,.8)';
        this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
      }
    });
  }

}
