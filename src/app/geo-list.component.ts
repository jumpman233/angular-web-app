import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'geo-list',
  template: `
    <section *ngIf="_list.length > 0" [@stateChange]="'flyIn'">
      <div class="row mb-3 mr-1" style="justify-content: flex-end;">
        <button class="btn btn-normal" [disabled]="!hasDetail"  (click)="toggleState()">Details ></button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" style="width: 10%">#</th>
            <th scope="col" style="width: 10%">Category</th>
            <th scope="col" style="width: 20%">Name</th>
            <th scope="col" style="width: 20%">Address</th>
            <th scope="col" style="width: 10%">Favorite</th>
            <th scope="col" style="width: 10%">Details</th> 
          </tr>
        </thead>
        <tbody>
          <tr class="table-row {{ item.place_id == selItem ? 'table-warning' : '' }}" *ngFor="let item of _list; index as i;">
            <th scope="row">{{ i + 1 }}</th>
            <td><img width="30" height="30" src="{{ item.icon }}" alt=""></td>
            <td>{{ item.name }}</td>
            <td>{{ item.vicinity }}</td>
            <td><button 
                class="icon {{ item.isFav ? 'icon-is-fa' : 'icon-favorite'}} {{ type == 1 ? 'icon-trash' : '' }}"
                (click)="favoriteClick(item)"></button></td>
            <td><button class="icon icon-to-detail" (click)="toDetail(item)"></button></td>
          </tr>
        </tbody>
      </table>
      <div class="center-block row" *ngIf="type==0" style="justify-content: center;">
        <button *ngIf="hasPre" class="btn btn-normal mr-5" (click)="updateListByPage()">Previous</button>
        <button *ngIf="nextPageToken" class="btn btn-normal" (click)="updateListByToken(nextPageToken)">Next</button>
      </div>
    </section>
    <div *ngIf="_list.length == 0" class="alert alert-warning" role="alert">
      No Records
    </div>
  `,
  animations: [
    trigger('stateChange', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition('void => *', [ style({transform: 'translateX(100%)'}), animate(500) ])
    ])
  ],
  styleUrls: [ './geo-list.component.css', './common.css' ]
})

export class GeoListComponent implements OnInit {
  totList;
  _list;
  _type;
  page;
  favoriteList;
  @Input('hasPre') hasPre: boolean;
  @Input('nextPageToken') nextPageToken: boolean;
  @Input('list')
  set list(data){
    if(!data) {
      return;
    }
    this._list = this.resolveListData(data);
    this.totList = this._list;
    this.page = 0;
    this.refreshFavList();
  }
  get list(){
    return this._list;
  }
  @Input('type')
  set type(value){
    this._type = value;
    if(this._type == 0){
      this._list = (this.totList && this.totList.slice(this.page * 20, this.page * 20 + 20)) || [];
    } else if(this._type == 1){
      let listStr = localStorage.getItem('favorite_list');
      this.favoriteList = listStr ? JSON.parse(listStr) : [];
      this._list = this.favoriteList;
      this.refreshFavList();
    }
  }
  get type(){
    return this._type;
  }
  @Input('selItem') selItem;
  @Input('location') location: any;
  @Input('hasDetail') hasDetail: boolean;
  @Output() onClickDetail = new EventEmitter<boolean>();
  @Output() emitListActive = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {

  }

  resolveListData(data) {
    return data['results'].map((data)=>{
      return {
        icon: data.icon,
        name: data.name,
        vicinity: data.vicinity,
        location: data.geometry.location,
        place_id: data.place_id,
        photos: data.photos
      };
    });
  }

  refreshFavList() {
    this.totList && this.totList.forEach((item)=>{
      item.isFav = this.isFavorite(item.place_id);
    });
  }

  getListByToken(token) {
    return this.http.get(`/nearby_token/${token}`)
  }

  updateListByToken(token) {
    this.getListByToken(token)
      .subscribe((data)=>{
        this._list = this.resolveListData(data);

        this.totList.push(this.list);
        this.page++;
        this.hasPre = true;

        this.nextPageToken = data['next_page_token'];
        this.refreshFavList();
      });
  }

  updateListByPage(){
    this.page--;
    this.hasPre = this.page > 0;
    this._list = this.totList.slice(this.page * 20, this.page * 20 + 20);
  }

  favoriteClick(item){
    if (this._type == 1){
      for(let i = 0; i < this.favoriteList.length; i++){
        if(this.favoriteList[i].place_id === item.place_id) {
          this.favoriteList.splice(i, 1);
          break;
        }
      }
    } else{
      if(!this.isFavorite(item.place_id)){
        this.favoriteList.push(item);
      }
    }

    localStorage.setItem('favorite_list', JSON.stringify(this.favoriteList));

    this.refreshFavList();
  }

  isFavorite(place_id) {
    if(!this.favoriteList){
      return false;
    }
    for(let i = 0; i < this.favoriteList.length; i++){
      if(this.favoriteList[i].place_id === place_id) {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {
    this.hasPre = false;
    let listStr = localStorage.getItem('favorite_list');
    this.favoriteList = listStr ? JSON.parse(listStr) : [];
    this.refreshFavList();
  }

  toDetail(data) {
    this.onClickDetail.emit(data);
    this.emitListActive.emit(false);
  }

  toggleState() {
    this.emitListActive.emit(false);
  }
}
