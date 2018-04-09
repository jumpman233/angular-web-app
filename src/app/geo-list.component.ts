import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geo-list',
  template: `
    <button class="btn btn-normal">Details</button>
    <table class="geo-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Name</th>
          <th>Address</th>
          <th>Favorite</th>
          <th>Details</th> 
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of list; index as i;">
          <td>{{ i + 1 }}</td>
          <td><img src="{{ item.icon }}" alt=""></td>
          <td>{{ item.name }}</td>
          <td>{{ item.vicinity }}</td>
          <td><button class="icon icon-favorite"></button></td>
          <td><button class="icon icon-to-detail" (click)="toDetail({location: item.location, placeId: item.place_id})"></button></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoListComponent implements OnInit {
  @Input('list') list: any;
  @Input('location') location: any;
  @Output() onClickDetail = new EventEmitter<boolean>();

  ngOnInit() {
  }

  toDetail(data) {
    this.onClickDetail.emit(data);
  }
}
