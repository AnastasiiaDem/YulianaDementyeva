import {Component, HostListener, OnInit} from '@angular/core';
import bookData from './book-data.json';
import runwayData from './runway-data.json';
import polaroidData from './polaroid-data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showName = true;
  bookItems: any = [];
  runwayItems: any;
  polaroidItems: any;
  count = 0;
  inc = 0;
  margin = 0;
  itemDisplay = 0;
  slider: any;
  allBookItems: any = [];
  more = 0;
  showSpinner = true;
  transition = false;
  body: any;
  line = 1;
  images: any;
  showNum = 15;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let parameters = (document.querySelector('.parameters') as HTMLElement)?.clientHeight;
    let parameters2 = (document.querySelector('#parameters2') as HTMLElement)?.clientHeight;
    let book = (document.querySelector('#book') as HTMLElement)?.clientHeight;
    let runway = (document.querySelector('#runway') as HTMLElement)?.clientHeight;
    let polaroid = (document.querySelector('#polaroid') as HTMLElement)?.clientHeight;
    let video = (document.querySelector('#video') as HTMLElement)?.clientHeight;
    let name = document.querySelector('.name') as HTMLElement;

    this.showName = window.pageYOffset < parameters + window.innerWidth - 430 || window.pageYOffset > parameters2 + book + runway + polaroid + video + 550;
  }

  constructor() {
    // setTimeout(() => {
    //   this.transition = true;
    //   this.body = document.querySelector('body') as HTMLElement;
    //   this.body.style.overflow = 'hidden';
      this.runwayItems = runwayData.data;
      this.allBookItems = bookData.data;
      this.polaroidItems = polaroidData.data;
      this.bookItems = this.allBookItems.slice(0, this.showNum);
    //   this.showSpinner = false;
    // }, 1000);
  }

  ngOnInit(): void {
    this.slider = document.getElementsByClassName('slider-width')[0];

    // setTimeout(() => {
    //   this.body.style.overflow = 'auto';
    // }, 3000);

    // if (screen.width > 990) {
    //   this.itemDisplay = 4;
    //   this.margin = this.itemDisplay * 5;
    // }
    // if (screen.width > 700 && screen.width < 990) {
    //   this.itemDisplay = 3;
    //   this.margin = this.itemDisplay * 6.8;
    // }
    // if (screen.width > 280 && screen.width < 700) {
    //   this.itemDisplay = 1;
    //   this.margin = 10;
    // }

    // this.itemleft = this.items.length % 4;
    // this.itemslide = Math.floor(this.items.length / 4) - 1;

    // for (let i = 0; i < this.items.length; i++) {
    //   (this.items[i] as HTMLElement).style.width = (screen.width / 4) - this.margin + 'px';
    // }
  }

  next() {
    // if (this.inc <= 10) {
    //   this.inc++;
    this.count = this.count - 540;
    // }

    this.slider.style.left = this.count + 'px';
  }

  prev() {
    // if (this.inc !== 0) {
    //   this.inc--;
    this.count = this.count + 540;
    // }

    this.slider.style.left = this.count + 'px';
  }

  loadMore() {
    this.more += 14;
    this.bookItems = this.allBookItems.slice(0, this.showNum + this.more);
    setTimeout(() => {
      this.images = document.querySelectorAll('.book-image');
      this.images.forEach((e: any) => {
        if (e.getAttribute('src') == '') {
          e.parentElement.style.height = 0;
        }
      });
    }, 0);
  }

  showLess() {
    this.more = 0;
    this.bookItems = this.allBookItems.slice(0, this.showNum);

    let book = document.getElementById('book');
    book?.scrollIntoView();
  }

  calcMargin(i: number) {
    if (i%4 == 0) {
      this.line = i / 4;
    }
    return (i > 3) && (i%2 == 0) ? ('-' + (this.line * 50) + 'px') : '0';
  }
}
