import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'detail-photos',
  template: `
    <div class="grid">
        <div class="grid-item" *ngFor="let item of photos">
            <a href="{{ item.fullUrl }}" target="_blank">
                <img src="{{ item.url }}" alt=""/>
            </a>
        </div>
    </div>
  `,
  styleUrls: [ './geo-detail-photo.component.css' ]
})

export class GeoDetailPhotoComponent implements OnInit, AfterViewChecked{
  private _photos: any;
  private $grid: any;
  @Input('photos')
  set photos(photos: any) {
    if(!Array.isArray(photos)){
      return;
    }

    this._photos = photos;
    this._photos.forEach((item)=>{
      item.url = item.getUrl( { maxWidth: 300 } );
      item.fullUrl = item.getUrl({ maxWidth: item.width });
    });
    console.log(this._photos)
  }

  get photos():any{
    return this._photos;
  }

  constructor() {
    this._photos = [];
  }

  ngAfterViewChecked(){
  }

  ngOnInit(){
    this.$grid = window['$']('.grid');

    // this.$grid.masonry({
    //   itemSelector: '.grid-item',
    //   columnWidth: 200
    // });
  }
}
