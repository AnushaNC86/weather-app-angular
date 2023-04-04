import { ServicesService } from './../../../services/services.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  dataFromServer: any = [];

  constructor(private weatherService: ServicesService) {}

  refreshData() {
    this.dataFromServer = JSON.parse(localStorage.getItem('recents') || '[]');

    console.log('dataaa', this.dataFromServer.main.temp);
  }
}
