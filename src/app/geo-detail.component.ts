import { Component, Input, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'geo-detail',
  template: `
    <section id="detail">
        <ul class="nav nav-tabs">
            <li class="nav-item" role="">
                <a class="nav-link active" id="nav-info-tab" href="#info" data-toggle="tab" aria-controls="info" aria-selected="true">Info</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" (click)="photoTabClick()" id="nav-photo-tab" href="#photo" data-toggle="tab" aria-controls="photo" aria-selected="false">Photos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="nav-photo-tab" href="#map" data-toggle="tab" aria-controls="photo" aria-selected="false">Map</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="nav-photo-tab" href="#reviews" data-toggle="tab" aria-controls="photo" aria-selected="false">Reviews</a>
            </li>
        </ul>
        <div class="tab-content" id="geo-tab-content">
           <detail-info 
             [address]="address" 
             [phoneNumber]="phoneNumber"
             [priceLevel]="priceLevel"
             [url]="url"
             [website]="website"
             [openDesc]="openDesc"
             [rate]="rate" 
             class="tab-pane fade show active" 
             id="info"></detail-info>
           <detail-photos [photos]="photos" class="tab-pane" id="photo"></detail-photos>
           <detail-map [toAdd]="address" [map]="map" [toPos]="location" class="tab-pane" id="map"></detail-map>
        </div>
    </section>
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoDetailComponent implements OnInit{
  address: string;
  phoneNumber: string;
  priceLevel: string;
  url: string;
  website: string;
  openDesc: string;
  rate: number;
  photos: object;
  map: any;
  _placeId: string;

  @Input('location') location: object;



  @Input('placeId')
  set placeId(placeId: string) {
    let self = this;

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
        self.openDesc = data.opening_hours.open_now ? `Open now: ${this.getDayInWeek(data.opening_hours.weekday_text)}` :
          'Close';
        self.rate = data.rating;

        self.photos = data.photos;
        console.log(this.location)
        console.log(data);

        self.cdRef.detectChanges();

        this.createMarker(this.map, this.location);
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
    this.rate = 0;
    this.location = {};
  }

  photoTabClick(){

  }

  ngOnInit(){
  }

  getDayInWeek(weekday_text) {
    let day = new Date().getDay();
    return weekday_text[day].substring(weekday_text[day].indexOf(':') + 1);
  }

  createMarker(map, position){
    const google = window['google'];

    return new google.maps.Marker({ map, position });
  }
}
