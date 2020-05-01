import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


// angular-material imports
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';

// for http web service calls
import { HttpClientModule } from '@angular/common/http';
import { CovidDataService } from './covid-data.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the timeline library
import { VerticalTimelineModule } from 'angular-vertical-timeline';

// Custom scroll
import { NgScrollbarModule } from 'ngx-scrollbar';

// Custom progress bar
import { NgProgressModule } from 'ngx-progressbar';

// Charts
import { ChartsModule } from 'ng2-charts';

// Countdown
import { CountdownModule } from 'ngx-countdown';

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
    NgProgressModule,
    MatButtonModule,
    ChartsModule,
    MatExpansionModule,
    MatFormFieldModule,
    CountdownModule,
    MatBadgeModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [CovidDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
