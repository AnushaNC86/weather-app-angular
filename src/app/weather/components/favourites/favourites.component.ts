import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  favData: any = [];
  visible: boolean = false;
  constructor(private weatherService: ServicesService) {}

  refresh() {
    this.favData = JSON.parse(localStorage.getItem('favourits') || '[]');
  }

  removeFavourites(datas: any) {
    this.favData = this.favData.filter((data: any) => data.id !== datas.id);
    localStorage.setItem('favourits', JSON.stringify(this.favData));
    this.refresh();
  }

  showDialog() {
    this.visible = true;
  }
}
