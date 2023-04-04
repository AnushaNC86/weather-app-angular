import { ServicesService } from './../../../services/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  search: string = '';
  dataFromServer: any = {};
  favHeart: boolean = false;
  iconUrl: string = '';
  favData: any = [];
  favDataFound: boolean = false;

  constructor(private weatherService: ServicesService) {}

  ngOnInit() {}

  dataRefresh() {
    this.dataFromServer = this.weatherService.weatherData;

    this.dataFromServer = JSON.parse(localStorage.getItem('recents') || '[]');
    this.iconUrl =
      'https://openweathermap.org/img/wn/' +
      this.dataFromServer.weather[0].icon +
      '@2x.png';
    console.log('this.dataFromServer', this.dataFromServer.name);
    this.favData = JSON.parse(localStorage.getItem('favourits') || '[]');
    this.favDataFound = this.favData.some(
      (data: any) => data.id == this.dataFromServer.id
    );
    if (this.favDataFound) {
      this.favHeart = true;
    } else {
      this.favHeart = false;
    }
  }
  addFav(datas: any) {
    this.weatherService.addFav(datas).subscribe(
      (res: any) => {
        this.favData = res;
        console.log('serviceres', res);
      },
      (err: any) => {
        alert('not added to fav');
      }
    );
  }

  removeFav(datas: any) {
    this.weatherService.removeFav(datas).subscribe(
      (res: any) => {
        this.favData = res;
      },
      (err: any) => {
        alert('Enter correct city name');
      }
    );
  }
}
