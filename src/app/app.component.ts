import { Component } from '@angular/core';
import { jquery } from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/bootstrap/dist/css/bootstrap.css'
  ]
})
export class AppComponent {
  title = 'app';

  onBlur(value: string){
    let ele = event.target;
    ele.value = ele.value.trim();
    event.target.parentElement.classList.add('was-validated');
  }
}
