import { Component, OnInit } from '@angular/core';
import { jquery } from 'jquery';
import list from './list';

let NewList = list.results.map((data, index)=>{
  return {
    icon: data.icon,
    name: data.name,
    vicinity: data.vicinity,
    location: data.geometry.location,
    place_id: data.place_id,
    photos: data.photos
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})

export class AppComponent implements OnInit{
  title = 'app';
  list = NewList;
  curPlace = {
    location: {},
    placeId: ''
  };

  ngOnInit(){

  }

  onClickDetail(data){
    this.curPlace.location = data.location;
    this.curPlace.placeId = data.placeId;
  }
  //
  // onBlur(value: string){
  //   let ele = event.target;
  //   // ele.value = ele.value.trim();
  //   // event.target.parentElement.classList.add('was-validated');
  // }
}
