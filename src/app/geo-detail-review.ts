import { Component, Input, OnInit } from '@angular/core';
import yelpreviews from './reviews';

@Component({
  selector: 'detail-review',
  template: `
    <div class="row mb-3">
      <div class="dropdown pl-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="reviewsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ curReview }}
        </button>
        <div class="dropdown-menu" aria-labelledby="reviewsDropdown">
          <a href="avascript:void(0);" 
            *ngFor="let item of reviewSelList; index as i;"
            class="dropdown-item"
            (click)="curReview=item"
            >{{ item }}</a>
        </div>
      </div>
      <div class="dropdown pl-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="orderDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ curOrder }}
        </button>
        <div class="dropdown-menu" aria-labelledby="orderDropdown">
          <a href="avascript:void(0);" 
            *ngFor="let item of orderList; index as i;"
            class="dropdown-item"
            (click)="curOrder=item"
            >{{ item }}</a>
        </div>
      </div>
    </div>
    <google-review *ngIf="curReview === 'Google Reviews'" [reviews]="googleReviews"></google-review>
    <yelp-review *ngIf="curReview === 'Yelp Reviews'" [reviews]="yelpReviews"></yelp-review>
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoDetailReview implements OnInit {
  private _data: object;
  private name;
  private city;
  private state;
  private country;
  private address1;
  private address2;
  private address3;
  orderList = ['Default Order', 'Highest Rating', 'Lowest Rating', 'Most Recent', 'Least Recent'];
  reviewSelList = ['Google Reviews', 'Yelp Reviews'];
  private yelpReviews;
  private _curOrder;
  private _curReview;
  @Input()
  set curOrder(str){
    if(this.curReview === 'Google Reviews') {
      switch (str){
        case 'Default Order':
          break;
        case 'Highest Rating':
          this.sortDescByKey(this.googleReviews, 'rating');
          break;
        case 'Lowest Rating':
          this.sortAscByKey(this.googleReviews, 'rating');
          break;
        case 'Most Recent':
          this.sortDescByKey(this.googleReviews, 'time');
          break;
        case 'Least Recent':
          this.sortAscByKey(this.googleReviews, 'time');
          break;
        default:
          break;
      }
    } else if(this.curReview === 'Yelp Reviews'){
      switch (str) {
        case 'Default Order':
          break;
        case 'Highest Rating':
          this.sortDescByKey(this.yelpReviews, 'rating');
          break;
        case 'Lowest Rating':
          this.sortAscByKey(this.yelpReviews, 'rating');
          break;
        case 'Most Recent':
          this.sortDescByKey(this.yelpReviews, 'time_created');
          break;
        case 'Least Recent':
          this.sortAscByKey(this.yelpReviews, 'time_created');
          break;
        default:
          break;
      }
    }
    this._curOrder = str;
  }
  get curOrder(){
    return this._curOrder;
  }
  @Input()
  set curReview(str){
    this._curReview = str;
  }
  get curReview(){
    return this._curReview
  }
  @Input('googleReviews') googleReviews: any;
  @Input('data')
  set data(data){
    if(!data){
      return;
    }
    this._data = data;
    this.name = data['name'];
    this.city = data['city'];
    this.state = data['state'];
    this.country = data['country'];
    this.address1 = data['address1'];
    this.address2 = data['address2'];
    this.address3 = data['address3'];
  }

  get data(){
    return this._data;
  }

  sortAscByKey(list, key){
    if(!list) {
      return;
    }
    list.sort((itemA, itemB)=> {
      if(itemA[key] > itemB[key] ){
        return 1;
      } else if(itemA[key] === itemB[key]){
        return 0;
      } else{
        return -1;
      }
    });
  }

  sortDescByKey(list, key){
    if(!list) {
      return;
    }
    list.sort((itemA, itemB)=> {
      if(itemA[key] < itemB[key] ){
        return 1;
      } else if(itemA[key] === itemB[key]){
        return 0;
      } else{
        return -1;
      }
    });
  }

  ngOnInit() {
    this._curOrder = this.orderList[0];
    this._curReview = this.reviewSelList[0];
    this.yelpReviews = yelpreviews;
  }

}
