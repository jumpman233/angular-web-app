import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yelp-review',
  template: `
    <div *ngIf="reviews.length > 0" >
      <div *ngFor="let item of reviews; index as i;" class="card mb-2" style="width: 100%;">
        <div class="row">
          <div class="col-lg-1">
              <a href="{{ item.url}}" target="_blank">
                  <img src="{{ item.user.image_url }}" width="50" height="50" alt="" style="border-radius: 50%">
              </a>
          </div>
          <div class="col-lg-11">
            <div class="card-body">
              <h5 class="card-title"><a target="_blank" href="{{ item.author_url }}">{{ item.user.name }}</a></h5>
              <p><stars [rate]="item.rating"></stars> {{ item.time_created }}</p>
              <p class="card-text">{{ item.text }}</p>
            </div>
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

export class GeoDetailReviewYelpComponent implements OnInit {
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
