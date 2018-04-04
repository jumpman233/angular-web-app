import { Component, Input } from '@angular/core';

@Component({
  selector: 'geo-list',
  template: `
    <tr>
        <th>#</th>
        <th>Category</th>
        <th>Name</th>
        <th>Address</th>
        <th>Favorite</th>
        <th>Details</th> 
    </tr>
  `
})

export class GeoListComponent{
  @Input('list') list: any;
}
