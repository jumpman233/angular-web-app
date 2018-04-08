import { Component } from '@angular/core';
import { jquery } from 'jquery';
import list from './list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})

export class AppComponent {
  title = 'app';
  list = list;
  //
  // onBlur(value: string){
  //   let ele = event.target;
  //   // ele.value = ele.value.trim();
  //   // event.target.parentElement.classList.add('was-validated');
  // }
}
