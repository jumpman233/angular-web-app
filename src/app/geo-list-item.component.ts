import { Component, Input } from '@angular/core';

@Component({
  selector: 'geo-list-item',
  template: `
    <tr>
        <td>{{ categoryImgUrl }}</td>
        <td>{{ name }}</td>
        <td>{{ address }}</td>
        <td>{{ detail }}</td> 
    </tr>
  `
})

export class GeoListItemComponent {
  @Input('categoryImgUrl') categoryImgUrl: string;
  @Input('name') name: string;
  @Input('address') address: string;
  @Input('detail') detail: string;
}
