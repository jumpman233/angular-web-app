import { Component, Input } from '@angular/core';

@Component({
  selector: 'stars',
  template: `
    <div class="stars-wrapper">
        <div class="stars">
            <span *ngFor="let item of starList; index as i;" class="star-item">
                <i class="star"></i>
                <i class="star-mask {{item}}"></i>
            </span>
        </div>
    </div>
  `,
  styleUrls: ['./star.component.css']
})

export class StarComponent {
  private starList: any;
  @Input('rate')
  set rate(rate: number){
    this.starList = [];

    while(rate > 0){
      let r = rate >= 1 ? 0 : 1 - rate;
      this.starList.push(`starm-${(r * 10).toFixed(0)}`);
      rate--;
    }
  }
  get rate():number{
    return this.starList.length;
  }

  getStyle(num){
    return 'width: 100px';
  }
}
