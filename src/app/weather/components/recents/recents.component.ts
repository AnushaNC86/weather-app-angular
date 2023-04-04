import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: [
    './recents.component.scss',
    '../favourites/favourites.component.scss',
  ],
})
export class RecentsComponent {
  recentData = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  recents = JSON.parse(localStorage.getItem('recents') || '[]');
  recentSeachedData: any = [];
  favData = JSON.parse(localStorage.getItem('favourits') || '[]');
  isFav: boolean = false;
  dataFromServer: any = [];
  favHeart: any = [];
  ids: any = [];
  favDataFound: boolean = false;
  recentOrders: any = [];
  visible: boolean = false;

  constructor(private weatherService: ServicesService) {}

  refresh() {
    this.recentData = JSON.parse(
      localStorage.getItem('recentSearches') || '[]'
    );
  }

  onRefreshData() {
    this.recentData = JSON.parse(
      localStorage.getItem('recentSearches') || '[]'
    );
    this.recentOrders = this.recentData.reverse();
    console.log('recentOrders', this.recentOrders);

    this.dataFromServer = this.weatherService.weatherData;
    this.favData.map((ele: any) => {
      this.recentData.map((ele1: any) => {
        if (ele.id === ele1.id) {
          this.favHeart[ele1.id] = true;
        }
      });
    });
    this.isFav = this.recentData.some(
      (ele: any) => ele.id === this.dataFromServer.id
    );
  }

  addFavs(datas: any) {
    this.favHeart[datas.id] = true;
    // this.favData[datas] = true;
    this.favDataFound = this.favData.some((data: any) => data.id === datas.id);

    if (!this.favDataFound) {
      this.favData.push(datas);
      localStorage.setItem('favourits', JSON.stringify(this.favData));
    }
  }

  removeFavs(datas: any) {
    this.favHeart[datas.id] = false;
    this.favData = this.favData.filter((data: any) => data.id !== datas.id);
    localStorage.setItem('favourits', JSON.stringify(this.favData));
  }
  showDialog() {
    this.visible = true;
  }
  closeModal(data: boolean) {
    // data ? (this.visible = false) : (this.visible = true);
    if (!data) {
      localStorage.removeItem('recentSearches');
      this.visible = false;
    } else {
      this.visible = false;
    }
  }
}
