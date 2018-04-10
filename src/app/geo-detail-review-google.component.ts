import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'google-review',
  template: `
    <div *ngIf="reviews.length > 0">
      <div *ngFor="let item of reviews; index as i;" class="card mb-2" style="width: 100%;">
        <div class="card-body row">
          <div class="col-lg-1 col-3">
            <a href="{{ item.author_url }}" target="_blank">
                <img src="{{ item.profile_photo_url }}" width="50" height="50" alt="">
            </a>
          </div>
          <div class="col-lg-11 col-9">
            <h5 class="card-title"><a target="_blank" href="{{ item.author_url }}">{{ item.author_name }}</a></h5>
            <p><stars [rate]="item.rating"></stars> {{ item.time * 1000 | date: 'yyyy-MM-dd HH:mm' }}</p>
            <p class="card-text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="reviews.length == 0" class="alert alert-warning" role="alert">
      No Records
    </div>
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoDetailReviewGoogleComponent implements OnInit {
  private _reviews: any;
  @Input('reviews')
  set reviews(reviews){
    this._reviews = reviews || [];
  }
  get reviews(){
    return this._reviews;
  }

  ngOnInit(){

  }

}
