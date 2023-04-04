import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TabsContainerComponent } from './components/tabs-container/tabs-container.component';
import { HomeComponent } from './components/home/home.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RecentsComponent } from './components/recents/recents.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'favourite',
    component: FavouritesComponent,
  },
  {
    path: 'recents',
    component: RecentsComponent,
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    TabsContainerComponent,
    HomeComponent,
    FavouritesComponent,
    RecentsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
  ],
  exports: [HeaderComponent],
})
export class WeatherModule {}
