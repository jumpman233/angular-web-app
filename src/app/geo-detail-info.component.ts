import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'detail-info',
  template: `
      <table class="table table-striped">
      <tbody>
        <tr *ngIf="address">
          <th scope="row">Address</th>
          <td>{{ address }}</td>
        </tr>
        <tr *ngIf="phoneNumber">
          <th scope="row">Phone Number</th>
          <td>{{ phoneNumber }}</td>
        </tr>
        <tr *ngIf="priceLevel">
          <th scope="row">Price Level</th>
          <td>{{ priceLevel }}</td>
        </tr>
        <tr *ngIf="rate">
          <th scope="row">Rating</th>
          <td>{{ rate }} <stars [rate]="rate"></stars></td>
        </tr>
        <tr *ngIf="url">
          <th scope="row">Google Page</th>
          <td><a href="{{ url }}">{{ url }}</a></td>
        </tr>
        <tr *ngIf="website">
          <th scope="row">Website</th>
          <td><a href="{{ website }}" target="_blank">{{ website }}</a></td>
        </tr>
        <tr *ngIf="openDesc">
          <th scope="row">Hours</th>
          <td>{{ openDesc }}</td>
        </tr>
      </tbody>
      </table>
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoDetailInfoComponent{
  @Input() address: string;
  @Input() phoneNumber: string;
  @Input() priceLevel: string;
  @Input() url: string;
  @Input() website: string;
  @Input() openDesc: string;
  @Input() rate: number;
}
