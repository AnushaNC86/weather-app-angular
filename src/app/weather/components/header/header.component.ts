import { ServicesService } from './../../../services/services.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  search: string = 'udupi';
  cityName: string = '';
  weatherData: any = [];
  recentData: any = [];
  dataPresent: boolean = false;
  isRecent: boolean = false;
  @Output() onSearch = new EventEmitter();
  recents: any = [];
  constructor(
    private weatherService: ServicesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.search !== '') {
      this.weatherService.getWeatherData(this.search).subscribe(
        (res: any) => {
          console.log('res', res);
          this.weatherData = res;
          this.recentData.push(this.weatherData);
          this.weatherService.weatherData = this.weatherData;
          this.storeData();
        },
        (err: any) => {
          alert('Enter correct city name');
        }
      );
      this.router.navigate(['/']);
      this.search = '';
    } else {
      alert('Enter  city name');
    }
  }
  storeData() {
    localStorage.setItem('recents', JSON.stringify(this.weatherData));
    this.recentData = JSON.parse(
      localStorage.getItem('recentSearches') || '[]'
    );
    this.isRecent = this.recentData.some(
      (item: any) => item.id === this.weatherData.id
    );
    if (!this.isRecent) {
      this.recentData.push(this.weatherData);
      localStorage.setItem('recentSearches', JSON.stringify(this.recentData));
    }
  }
}
