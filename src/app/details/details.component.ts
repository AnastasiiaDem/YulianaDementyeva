import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import detailData from '../details-data.json';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

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
              private spinner: NgxSpinnerService) {
    this.title = this.router.getCurrentNavigation()?.extras.state?.['title'];
    this.displayData = detailData.data.find(e => {
      return e.title == this.title;
    });
    this.grid = this.displayData.grid;
  }

  ngOnInit() {
    this.spinner.show();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
