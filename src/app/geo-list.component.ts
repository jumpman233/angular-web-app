import { Component, Input, OnInit } from '@angular/core';

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
          <td><button class="icon icon-to-detail"></button></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoListComponent implements OnInit{
  @Input('list') list: any;

  ngOnInit() {
  }
}
