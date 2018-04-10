import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './common.css'
  ]
})

export class AppComponent implements OnInit{
  title = 'app';
  model = {
    keyword: '',
    category: '',
    distance: '',
    locType: '1',
    location: ''
  };
  curAddress;
  types = ["default", "accounting","airport","amusement_park","aquarium","art_gallery","atm","bakery","bank","bar","beauty_salon","bicycle_store","book_store","bowling_alley","bus_station","cafe","campground","car_dealer","car_rental","car_repair","car_wash","casino","cemetery","church","city_hall","clothing_store","convenience_store","courthouse","dentist","department_store","doctor","electrician","electronics_store","embassy","fire_station","florist","funeral_home","furniture_store","gas_station","gym","hair_care","hardware_store","hindu_temple","home_goods_store","hospital","insurance_agenc","jewelry_store","laundry","lawyer","library","liquor_store","local_government_office","locksmith","lodging","meal_delivery","meal_takeaway","mosque","movie_rental","movie_theater","moving_company","museum","night_club","painter","park","parking","pet_store","pharmacy","physiotherapist","plumber","police","post_office","real_estate_agency","restaurant","roofing_contractor","rv_park","school","shoe_store","shopping_mall","spa","stadium","storage","store","subway_station","supermarket","synagogue","taxi_stand","train_station","transit_station","travel_agency","veterinary_care","zoo"];
  list;
  hasDetail: boolean;
  listActive: boolean;
  showProgress: boolean;
  showContent: boolean;
  ifCurLoc: boolean;
  listType;
  ifDisable: boolean;
  keywordTouched;
  locationTouched;
  nextPageToken: string;
  curPlace = {
    location: {},
    placeId: '',
    item: {}
  };
  _curLocation: object;
  set curLocation(location) {
    this._curLocation = location;
  };
  get curLocation() {
    return this._curLocation;
  }

  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient){
  }

  getCurLocation() {
    return this.http.get('http://ip-api.com/json')
  }

  getCurGeo(address) {
    return this.http.get(`/address/${address}`)
  }

  getNearBy(lat, lng, distance, type, keyword) {
    return this.http.get(`/nearby?lat=${lat}&lng=${lng}&radius=${distance || 10}&type=${type}&keyword=${keyword}`)
  }

  ngOnInit(){
    this.model.category = this.types[0];
    this.model.locType = '1';
    this.ifCurLoc = true;
    this.hasDetail = false;
    this.showProgress = false;
    this.showContent = false;
    this.ifDisable = true;
    this.listType = 0;

    this.getCurLocation()
      .subscribe(data => {
        this.curLocation = {
          lat: data['lat'],
          lng: data['lon']
        };
        this.curAddress = data['org'];

        // set autoComplete
        let circle = new window['google'].maps.Circle({
          center: this.curLocation,
          radius: 30
        });
        let autocomplete = new window['google'].maps.places.Autocomplete(
          (document.getElementById('oth-location-input')),
          {types: ['geocode']});
        autocomplete.setBounds(circle.getBounds());
      });
    this.listActive = true;
  }

  onClickDetail(data){
    this.curPlace.location = data.location;
    this.curPlace.placeId = data.place_id;
    this.curPlace.item = data;
    this.hasDetail = true;
  }

  checkActive(data){
    this.listActive = data;
  }

  submitData(lat, lng, distance, category, keyword) {
    this.getNearBy(lat, lng, distance, category, keyword)
      .subscribe(data=>{
        this.list = data;

        this.showProgress = false;
        this.showContent = true;
        this.listActive = true;
        this.nextPageToken = data['next_page_token'];
      });
  }

  navClick(value) {
    this.listType = value;
    this.listActive = true;
    this.showContent = true;
  }

  onSubmit() {
    let locationValue = document.getElementById('oth-location-input')['value'];

    this.showProgress = true;
    this.showContent = false;
    if(this.model.locType === '1'){
      this.ifCurLoc = true;
      this.getCurLocation()
        .subscribe(data => {
          this.curLocation = {
            lat: data['lat'],
            lng: data['lon']
          };
          this.curAddress = data['org'];
          this.ifCurLoc = true;

          this.submitData(this.curLocation['lat'],
            this.curLocation['lng'],
            this.model.distance,
            this.model.category,
            this.model.keyword
          );
        })
    } else{
      this.getCurGeo(locationValue)
        .subscribe(data => {
          this.curLocation = data['results'][0].geometry.location;
          this.curAddress = data['results'][0].formatted_address;
          this.ifCurLoc = false;

          this.submitData(this.curLocation['lat'],
            this.curLocation['lng'],
            this.model.distance,
            this.model.category,
            this.model.keyword);
        });
    }
  }

  checkCanSubmit() {
    let locationValue = document.getElementById('oth-location-input')['value'];
    let keywordValue = document.getElementById('keyword')['value'];
    if(this.model.locType === '1') {
      this.ifDisable = keywordValue.trim() === '';
    } else{
      this.ifDisable = locationValue.trim() === '' || keywordValue.trim() === '';
    }
  }

  keywordInputChange() {
    this.keywordTouched = true;

    this.checkCanSubmit();
  }

  locationInputChange() {
    this.locationTouched = true;

    this.checkCanSubmit();
  }

  onClear() {
    this.model.location = '';
    this.model.locType = '1';
    this.model.keyword = '';
    this.model.category = this.types[0];
    this.model.distance = '';
    this.showProgress = false;
    this.showContent = false;
    this.curPlace.location = '';
    this.curPlace.placeId = '';
  }
}
