import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import runwayData from '../runway-data.json';
import bookData from '../book-data.json';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  showName = true;
  bookItems: any = [];
  runwayItems: any;
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
  step = 0;
  plus = false;
  minus = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let parameters = (document.querySelector('.parameters') as HTMLElement)?.clientHeight;
    let parameters2 = (document.querySelector('#parameters2') as HTMLElement)?.clientHeight;
    let book = (document.querySelector('#book') as HTMLElement)?.clientHeight;
    let runway = (document.querySelector('#runway') as HTMLElement)?.clientHeight;
    let polaroid = (document.querySelector('#polaroid') as HTMLElement)?.clientHeight;
    let video = (document.querySelector('#video') as HTMLElement)?.clientHeight;

    this.showName = window.pageYOffset < parameters + window.innerWidth - 430 || window.pageYOffset > parameters2 + book + runway + polaroid + video + 550;
  }

  constructor(private router: Router,
              private spinner: NgxSpinnerService) {
    // setTimeout(() => {
    //   this.transition = true;
    //   this.body = document.querySelector('body') as HTMLElement;
    //   this.body.style.overflow = 'hidden';
    this.runwayItems = runwayData.data;
    this.allBookItems = bookData.data;
    this.bookItems = this.allBookItems.slice(0, this.showNum);
    //   this.showSpinner = false;
    // }, 1000);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.spinner.show();
    this.slider = document.getElementsByClassName('slider-width')[0];

    if (window.innerWidth <= 480) {
      this.step = 11;
    } else if (window.innerWidth > 480 && window.innerWidth <= 768) {
      this.step = 7;
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      this.step = 5;
    } else {
      this.step = 4;
      this.plus = true;
      this.minus = true;
    }
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

  ngAfterViewInit() {
    console.log('ngAfterView');
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  next() {
   if (this.inc < this.step) {
      this.inc++;
      this.count = this.count - window.innerWidth - 10;
    }

    if (this.plus && this.inc == 4) {
      this.count = this.count + (window.innerWidth + 10) + ((window.innerWidth - 40) / 5) * (-4) - 40;
      this.plus = false;
    }

    this.slider.style.left = this.count + 'px';
  }

  prev() {
    if (this.inc > 0) {
      this.inc--;
      this.count = this.count + window.innerWidth + 10;
    }

    if (this.minus && this.inc == 0) {
      this.count = this.count - 10 - ((window.innerWidth - 40) / 5);
      this.minus = false;
    }

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
    if (i % 4 == 0) {
      this.line = i / 4;
    }
    return (i > 3) && (i % 2 == 0) ? ('-' + (this.line * 30) + 'px') : '0';
  }

  goToDetails(title: string) {
    this.router.navigateByUrl('/details', {state: {title}});
    window.scrollTo(0, 0);
  }
}
