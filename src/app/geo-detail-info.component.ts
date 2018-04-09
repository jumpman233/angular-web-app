import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'detail-info',
  template: `
      <table class="table table-striped">
      <tbody>
        <tr>
          <th scope="row">Address</th>
          <td>{{ address }}</td>
        </tr>
        <tr>
          <th scope="row">Phone Number</th>
          <td>{{ phoneNumber }}</td>
        </tr>
        <tr>
          <th scope="row">Price Level</th>
          <td>{{ priceLevel }}</td>
        </tr>
        <tr>
          <th scope="row">Rating</th>
          <td>{{ rate }} <stars [rate]="rate"></stars></td>
        </tr>
        <tr>
          <th scope="row">Google Page</th>
          <td><a href="{{ url }}">{{ url }}</a></td>
        </tr>
        <tr>
          <th scope="row">Website</th>
          <td><a href="{{ website }}">{{ website }}</a></td>
        </tr>
        <tr>
          <th scope="row">Hours</th>
          <td>{{ openDesc }}</td>
        </tr>
      </tbody>
      </table>
           
            <!--<div class="tab-pane fade" id="map">-->
            <!--</div>-->
    <!--<div class="tab-pane fade" id="reviews"></div>-->
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
