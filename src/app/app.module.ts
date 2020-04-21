import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// angular-material imports
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip'

// for http web service calls
import { HttpClientModule } from '@angular/common/http';
import { CovidDataService } from './covid-data.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the timeline library
import { VerticalTimelineModule } from 'angular-vertical-timeline';

// Custom scroll
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    VerticalTimelineModule,
    FlexLayoutModule,
    NgScrollbarModule,
  ],
  providers: [CovidDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
