import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DetailsComponent} from './moonaya/details.component';
import {AppRoutingModule} from './app-routing.module';
import { MainComponent } from './main/main.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdbCarouselModule,
    AppRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'ball-fussion' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
