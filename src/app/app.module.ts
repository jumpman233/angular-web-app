import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {  } from './geo-list.component';
import { GeoListItemComponent } from './geo-list-item.component';

let directives: any[] = [
  AppComponent,
  GeoListItemComponent
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
