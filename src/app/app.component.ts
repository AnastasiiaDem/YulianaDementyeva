import {Component, HostListener, OnInit} from '@angular/core';
import bookData from './book-data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showName = true;
  items: any = [];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let parameters = (document.querySelector('.parameters') as HTMLElement).clientHeight;
    let book = (document.querySelector('#book') as HTMLElement).clientHeight;
    let runway = (document.querySelector('#runway') as HTMLElement).clientHeight;
    let polaroid = (document.querySelector('#polaroid') as HTMLElement).clientHeight;
    let name = document.querySelector('.name') as HTMLElement;
    console.log(window.innerWidth);
    this.showName = window.pageYOffset < parameters + window.innerWidth - 430;
  }

  ngOnInit(): void {
    this.items = bookData.data;
  }

}
