import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesService implements OnInit {
  baseUrl: string =
    'https://api.openweathermap.org/data/2.5/weather?q=udupi&appid=a6559ac18242e2b3cc63faea404614ff';
  weatherData: any = [];
  weatherDatas!: [];
  favHeart: boolean = false;
  favData: any = [];
  favDatas: any = [];

  favDataFound: boolean = false;
  localFav: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getWeatherData(cityName: string) {
    this.weatherData = this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=a6559ac18242e2b3cc63faea404614ff`
    );
    return this.weatherData;
  }
  addFav(datas: any) {
    this.favHeart = true;
    this.favDatas[datas] = true;

    this.favData = JSON.parse(localStorage.getItem('favourits') || '[]');
    this.favDataFound = this.favData.some((data: any) => data.id === datas.id);
    console.log(' this.favDataFound ', this.favDataFound);

    if (!this.favDataFound) {
      this.favData.push(datas);

      this.localFav = localStorage.setItem(
        'favourits',
        JSON.stringify(this.favData)
      );
      return this.localFav;
    }
  }

  removeFav(datas: any) {
    this.favHeart = false;
    this.favData = this.favData.filter((data: any) => data.id !== datas.id);
    localStorage.setItem('favourits', JSON.stringify(this.favData));
    this.localFav = JSON.parse(localStorage.getItem('favourits') || '[]');
    console.log('this.localFav', this.favData);
    return this.localFav;
  }
}
