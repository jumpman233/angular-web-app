import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'geo-detail',
  template: `
    
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoDetailComponent{
  @Input('obj') obj: object;

}
