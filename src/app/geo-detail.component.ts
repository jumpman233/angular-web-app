import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'geo-detail',
  template: `
    <section id="detail" [@stateChange]="'flyIn'">
        <h2 style="text-align: center;" class="mb-2">{{ item.name }}</h2>
        <div class="row" style="justify-content: space-between; align-items: center;">
            <button class="btn btn-normal" (click)="toggleState()">< List</button>
            <div style="display: flex; justify-content: center; align-items: center;">
              <button class="icon btn hover {{ item.isFav ? 'icon-is-fa' : 'icon-favorite'}} mr-3"
                  (click)="favoriteClick()"></button>
              <a href="javascript:void(0);" (click)="twitterClick()"
              class="icon icon-twitter"
              >
              </a>
            </div>
        </div>
        <ul class="row nav nav-tabs mt-3 mb-3">
            <li class="nav-item" role="">
                <a class="nav-link active" id="nav-info-tab" href="#info" data-toggle="tab" aria-controls="info" aria-selected="true">Info</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="nav-photo-tab" href="#photo" data-toggle="tab" aria-controls="photo" aria-selected="false">Photos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="nav-photo-tab" href="#map" data-toggle="tab" aria-controls="reviews" aria-selected="false">Map</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="nav-photo-tab" href="#reviews" data-toggle="tab" aria-controls="reviews" aria-selected="false">Reviews</a>
            </li>
        </ul>
        <div class="row tab-content" id="geo-tab-content">
           <detail-info 
             [address]="address" 
             [phoneNumber]="phoneNumber"
             [priceLevel]="priceLevel"
             [url]="url"
             [website]="website"
             [openDesc]="openDesc"
             [rate]="rate" 
             [weekdayText]="weekdayText"
             class="tab-pane fade show active" 
             id="info"
             style="width: 100%"></detail-info>
           <detail-photos 
             [photos]="photos" 
             class="tab-pane fade" 
             id="photo"
             style="width: 100%"></detail-photos>
           <detail-map 
             [toAdd]="item.name" 
             [fromAdd]="curAddress"
             [map]="map" 
             [location]="location"
             [toPos]="location"
             [ifCurLoc]="ifCurLoc" 
             class="tab-pane fade"
             id="map"
             style="width: 100%"></detail-map>
           <detail-review 
             [data]="reviewData" 
             [googleReviews]="googleReviews" 
             class="tab-pane fade" 
             id="reviews"
             style="width: 100%"></detail-review>
        </div>
    </section>
  `,
  animations: [
    trigger('stateChange', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition('void => *', [ style({transform: 'translateX(-100%)'}), animate(500) ])
    ])
  ],
  styleUrls: [ './geo-list.component.css', './common.css' ]
})

export class GeoDetailComponent implements OnInit, OnDestroy{
  address: string;
  phoneNumber: string;
  priceLevel: string;
  url: string;
  website: string;
  openDesc: string;
  rate: any;
  photos: object;
  map: any;
  shareText: string;
  weekdayText;
  reviewData: object;
  googleReviews: object;
  _placeId: string;
  @Output() emitListActive = new EventEmitter<boolean>();
  @Output() finishProgress = new EventEmitter<boolean>();

  @Input('curAddress') curAddress;
  @Input('location') location: object;
  @Input('item') item;
  @Input('ifCurLoc') ifCurLoc;

  @Input('placeId')
  set placeId(placeId: string) {
    let self = this;
    const NOT_FOUND_TEXT = 'Not Found';

    const google = window['google'];

    self._placeId = placeId;

    if(! (typeof self.location['lat'] === 'number')){
      return;
    }

    this.map = new google.maps.Map(document.getElementById('mmp'), {
      center: this.location,
      zoom: 17,
      streetViewControl: false
    });

    if(self.map && self._placeId){
      let service = new google.maps.places.PlacesService(self.map);
      this.createMarker(this.map, this.location['lat'], this.location['lng']);

      service.getDetails({
        placeId: self._placeId
      }, (data) => {
        self.phoneNumber = data.international_phone_number;
        self.address = data.formatted_address;
        self.priceLevel = '';
        for(let i = 0; i < data.price_level; i++){
          self.priceLevel += '$';
        }
        self.url = data.url;
        self.website = data.website;
        self.openDesc = data.opening_hours && data.opening_hours.open_now ?
          `Open now: ${this.getDayInWeek(data.opening_hours.weekday_text)}` :
          'Close';
        self.weekdayText = data.opening_hours && data.opening_hours.weekday_text;
        if(!data.opening_hours){
          self.openDesc = '';
        }
        self.rate = data.rating;

        self.photos = data.photos;
        self.reviewData = self.getReviewRequired(data);
        self.googleReviews = data.reviews;

        self.shareText = `Check out ${self.item.name} located at ${self.address} Website: ${self.website}`;

        window['twttr'].widgets.load();

        if(!self.cdRef['destroyed']){
          self.cdRef.detectChanges();
        }
      });
    }
  }

  constructor(private cdRef: ChangeDetectorRef){
    this.address = '';
    this.phoneNumber = '';
    this.priceLevel = '';
    this.url = '';
    this.website = '';
    this.openDesc = '';
    this.rate = '';
    this.location = {};
  }

  ngOnInit(){
  }

  ngOnDestroy(){
    this.cdRef.detach();
  }

  getReviewRequired(data) {
    let result = {
      name: '',
      city: '',
      state: '',
      country: '',
      address1: '',
      address2: '',
      address3: ''
    };

    let arr = data.formatted_address.split(',');

    result.address1 = arr[0] || '';
    result.address2 = arr[1] || '';
    result.address3 = arr[2] || '';

    result.name = data.name;

    data.address_components.forEach((item) => {
      item.types.forEach((type) => {
        if(type === 'administrative_area_level_2'){
          result.city = item.short_name;
        } else if(type === 'administrative_area_level_1'){
          result.state = item.short_name;
        } else if(type === 'country'){
          result.country = item.short_name;
        }
      });
    });
    return result;
  }

  getDayInWeek(weekday_text) {
    let day = new Date().getDay();
    return weekday_text[day].substring(weekday_text[day].indexOf(':') + 1);
  }

  createMarker(map, lat, lng){
    const google = window['google'];

    let marker = new google.maps.Marker({ position: new google.maps.LatLng(lat, lng)});
    marker.setMap(map);

    return marker;
  }

  favoriteClick(){
    let listStr = localStorage.getItem('favorite_list');
    let favoriteList = listStr ? JSON.parse(listStr) : [];

    let isIn = false,
        index = 0;
    for(let i = 0; i < favoriteList.length; i++){
      if(favoriteList[i].place_id === this.item.place_id) {
        isIn = true;
        index = i;
        break;
      }
    }

    if(!this.item.isFav){
      if(!isIn) {
        favoriteList.push(this.item);
        localStorage.setItem('favorite_list', JSON.stringify(favoriteList));
        this.item.isFav = true;
      }
    } else {
      if(isIn) {
        favoriteList.splice(index, 1);
        localStorage.setItem('favorite_list', JSON.stringify(favoriteList));
        this.item.isFav = false;
      }
    }
  }

  twitterClick(){
    window.open(`https://twitter.com/share?text=${this.shareText}`,'','height=400,width=400')
  }

  toggleState(){
    this.emitListActive.emit(true);
  }
}
