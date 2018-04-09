import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'detail-map',
  template: `
    <div class="row">
        <div class="col-lg-4">
            <label for="to">From</label>
            <input type="text" class="form-control" name="from" id="from" [(ngModel)]="fromAdd" />
        </div>
        <div class="col-lg-4">
            <label for="to">To</label>
            <input type="text" class="form-control" disabled name="to" id="to" [(ngModel)]="toAdd" />
        </div>
        <div class="col-lg-3">
            <label for="mode">Travel Mode</label>
            <select class="form-control" name="mode" id="mode" [(ngModel)]="mode" >
                <option value="DRIVING">Driving</option>
                <option value="BICYCLING">BICYCLING</option>
                <option value="TRANSIT">Transit</option>
                <option value="WALKING">Walk</option>
            </select>
        </div>
        <div class="col-lg-1">
            <br/>
            <button class="btn btn-primary" style="margin-top: .5rem;" (click)="getDirection()">Get Directions</button>
        </div>
    </div>
    <div (click)="changeViewCLick()" [ngClass]="{ 'mt-2': true, 'mb-2': true, 'icon': true, 'icon-streetview': !showStreetView, 'icon-map': showStreetView}"></div>
    <div id="mmp" style="width: 100%; height: 600px;"></div>
    <div id="panel"></div>
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoDetailMapComponent implements OnInit {
  @Input('fromAdd') fromAdd: string;
  @Input('toAdd') toAdd: string;
  @Input('toPos') toPos: string;
  @Input('mode') mode: string;
  private _map;
  showStreetView;
  panorama;
  @Input('map')
  set map(map){
    this._map = map;
    this.directionsDisplay.setMap(this._map);
    try{
      this.panorama = this.map.getStreetView();
      this.panorama.setPosition(this.toPos);
      this.panorama.setPov(({
        heading: 265,
        pitch: 0
      }));
    } catch (e){

    }
  }
  get map(){
    return this._map;
  }
  address: any;
  directionsService = new window['google'].maps.DirectionsService;
  directionsDisplay = new window['google'].maps.DirectionsRenderer;

  getDirection(){
    let self = this;
    let origin = this.fromAdd;
    let destination = this.toAdd;
    console.log(this);

    this.directionsService.route({
      origin,
      destination,
      provideRouteAlternatives: true,
      travelMode: this.mode
    }, function(response, status) {
      if (status === 'OK') {
        self.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  changeViewCLick() {
    this.showStreetView = !this.showStreetView;

    this.panorama.setVisible(this.showStreetView);
  }

  ngOnInit() {
    this.showStreetView = false;
    this.address = {"lat":39.9289,"lng":116.3883,"address":"37 Pyrmont St, Pyrmont NSW 2009, Australia"};
    this.fromAdd = this.address.address;
    this.mode = 'DRIVING';
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(document.getElementById('panel'));
  }
}
