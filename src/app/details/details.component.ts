import {AfterViewInit, Component, OnInit} from '@angular/core';
import detailData from '../details-data.json';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Location} from '@angular/common';
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 5,
});

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit {
  displayData: any;
  title: any;
  grid: any;

  constructor(public router: Router,
              private spinner: NgxSpinnerService,
              private location: Location) {
    this.title = this.router.getCurrentNavigation()?.extras.state?.['title'];
    this.displayData = detailData.data2.find(e => {
      return e.title == this.title;
    });
    this.grid = this.displayData.grid;
  }

  ngOnInit() {
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.scrollTo('#top');
    this.spinner.show();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  back() {
    this.location.back();
  }
}
