import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'detail-info',
  template: `
      <div style="overflow: scroll;">
        <table class="table table-striped">
        <tbody>
          <tr *ngIf="address">
            <th style="min-width: 150px;" scope="row">Address</th>
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
            <td><a href="{{ url }}" target="_blank">{{ url }}</a></td>
          </tr>
          <tr *ngIf="website">
            <th scope="row">Website</th>
            <td><a href="{{ website }}" target="_blank">{{ website }}</a></td>
          </tr>
          <tr *ngIf="openDesc">
            <th scope="row">Hours</th>
            <td>
              {{ openDesc }} 
               <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">Daily open hours</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
  `,
  styleUrls: [ './geo-list.component.css' ]
})

export class GeoDetailInfoComponent implements OnInit, OnDestroy{
  _weekdayText;
  @Input() address: string;
  @Input() phoneNumber: string;
  @Input() priceLevel: string;
  @Input() url: string;
  @Input() website: string;
  @Input() openDesc: string;
  @Input() rate: number;
  @Input()
  set weekdayText(weekdayText) {
    if(Array.isArray(weekdayText)){
      this._weekdayText = weekdayText;
      this.initModal();
    }
  };
  get weekdayText(){
    return this._weekdayText;
  }
  private modal;

  ngOnInit() {
  }

  getListHTML() {
    let str = '';
    if(this.weekdayText && this.weekdayText.length && !this.modal) {
      this.weekdayText.forEach((item) => {
        str += `<tr>
              <td>${item.substring(0, item.indexOf(':'))}</td>
              <td>${item.substring(item.indexOf(':') + 1)}</td>
            </tr>`;
      });
    }

    return str;
  }

  initModal() {
    this.modal = window['$'](`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Open hours</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <table class="table">
                    ${this.getListHTML()}
                </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`);

    window['$']('body').append(this.modal);
  }

  ngOnDestroy() {
    this.modal && typeof this.modal.remove === 'function' && this.modal.remove();
  }
}
