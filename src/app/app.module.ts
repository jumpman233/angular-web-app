import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GeoListComponent } from './geo-list.component';
import { GeoDetailComponent } from './geo-detail.component';
import { GeoDetailInfoComponent } from './geo-detail-info.component';
import { StarComponent } from './star.component';
import { GeoDetailPhotoComponent } from './geo-detail-photo.component';
import { GeoDetailMapComponent } from './geo-detail-map.component';


let directives: any[] = [
  AppComponent,
  GeoListComponent,
  GeoDetailComponent,
  GeoDetailInfoComponent,
  StarComponent,
  GeoDetailPhotoComponent,
  GeoDetailMapComponent
];

@NgModule({
  declarations: directives,
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
