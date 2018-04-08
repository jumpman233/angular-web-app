import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeoListComponent } from './geo-list.component';
import { GeoDetailComponent } from './geo-detail.component';


let directives: any[] = [
  AppComponent,
  GeoListComponent,
  GeoDetailComponent
];

@NgModule({
  declarations: directives,
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
