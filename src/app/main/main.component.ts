import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import runwayData from '../runway-data.json';
import bookData from '../book-data.json';
import {NgxSpinnerService} from 'ngx-spinner';
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 5,
});

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild('plane1') plane1!: ElementRef;
  @ViewChild('plane2') plane2!: ElementRef;
  @ViewChild('plane3') plane3!: ElementRef;

  private requestAnimationFrameId: number = 0;
  private xForce = 0;
  private yForce = 0;
  private readonly easing = 0.05;
  private readonly speed = 5;

  showName = true;
  showUp = false;
  bookItems: any = [];
  runwayItems: any;
  count = 0;
  inc = 0;
  slider: any;
  allBookItems: any = [];
  more = 0;
  line = 1;
  showNum = 15;
  step = 0;
  plus = false;
  minus = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let navbar = (document.querySelector('#navbar') as HTMLElement)?.clientHeight;
    let parameters = (document.querySelector('#parameters') as HTMLElement)?.clientHeight;
    let book = (document.querySelector('#book') as HTMLElement)?.clientHeight;
    let contact = (document.querySelector('#contact') as HTMLElement)?.clientHeight;

    let B = document.body,
      H = document.documentElement,
      height;

    height = Math.max(B.scrollHeight, B.offsetHeight, H.clientHeight, H.scrollHeight, H.offsetHeight);

    this.showName = window.pageYOffset < navbar + parameters || window.pageYOffset > height - contact;

    this.showUp = window.pageYOffset > navbar + parameters + book - 400;
  }

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private renderer: Renderer2) {
    this.runwayItems = runwayData.data2;
    this.allBookItems = bookData.data2;
    this.bookItems = this.allBookItems.slice(0, this.showNum);
  }

  ngOnInit() {
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  manageMouseMove(e: MouseEvent): void {
    const { movementX, movementY } = e;
    this.xForce += movementX * this.speed;
    this.yForce += movementY * this.speed;

    if (this.requestAnimationFrameId === 0) {
      this.requestAnimationFrameId = requestAnimationFrame(() => this.animate());
    }
  }

  lerp(start: number, target: number, amount: number): number {
    return start * (1 - amount) + target * amount;
  }

  animate(): void {
    this.xForce = this.lerp(this.xForce, 0, this.easing);
    this.yForce = this.lerp(this.yForce, 0, this.easing);

    this.renderer.setStyle(this.plane1.nativeElement, 'transform', `translate(${this.xForce}px, ${this.yForce}px)`);
    this.renderer.setStyle(this.plane2.nativeElement, 'transform', `translate(${this.xForce * 0.5}px, ${this.yForce * 0.5}px)`);
    this.renderer.setStyle(this.plane3.nativeElement, 'transform', `translate(${this.xForce * 0.25}px, ${this.yForce * 0.25}px)`);

    if (Math.abs(this.xForce) < 0.01) this.xForce = 0;
    if (Math.abs(this.yForce) < 0.01) this.yForce = 0;

    if (this.xForce !== 0 || this.yForce !== 0) {
      this.requestAnimationFrameId = requestAnimationFrame(() => this.animate());
    } else {
      cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = 0;
    }
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

    if (this.minus && !this.plus && this.inc == 0) {
      this.count = this.count - 10 - ((window.innerWidth - 40) / 5);
      this.minus = false;
    }

    this.slider.style.left = this.count + 'px';
  }

  loadMore() {
    this.more += 14;
    this.bookItems = this.allBookItems.slice(0, this.showNum + this.more);
  }

  showLess() {
    this.more = 0;
    this.bookItems = this.allBookItems.slice(0, this.showNum);

    let book = document.getElementById('book');
    book?.scrollIntoView();
  }

  calcMargin(i: number) {
    if (this.step != 11) {
      if (i % 4 == 0) {
        this.line = i / 4;
      }
      return (i > 3) && (i % 2 == 0) ? ('-' + (this.line * 30) + 'px') : '0';
    } else {
      if (i % 2 == 0) {
        this.line = i / 2;
      }
      return (i > 1) && (i % 2 == 0) ? ('-' + (this.line * 30) + 'px') : '0';
    }
  }

  goToDetails(title: string) {
    this.router.navigateByUrl('/details', {state: {title}});
  }

  scrollTo(dest: string) {
    lenis.scrollTo(dest);
  }
}
