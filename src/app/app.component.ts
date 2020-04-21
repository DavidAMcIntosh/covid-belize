import { Component } from '@angular/core';
import { CovidDataService } from './covid-data.service';
import { TimelineElement } from './timeline.interface';
import { Covid19ApiResponse, CoronaApiResponse, WorldApiResponse } from './apis.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid-Belize';
  cases: number;
  deaths: number;
  recoveries: number;
  active: number;
  critical: number;
  tests: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  testsPerOneMillion: number;
  daysSinceLastCase: string;
  daysSinceLastDeath: string;
  todayCases: number;
  todayDeaths: number;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;

  //timeline
  timelineElements: Array<TimelineElement> = [];
  covid19Response: Array<Covid19ApiResponse> = [];

  constructor(private covidService: CovidDataService) { }

  ngOnInit() {
    this.getCovid19Data();
    this.getCoronaData();
    this.getWorldData();
  }

  getCovid19Data() {
    this.covidService.getCovid19Data()
      .then((data: Array<Covid19ApiResponse>) => {
        this.covid19Response = data;
        let lastIndex = data.length - 1;
        this.cases = data[lastIndex].Confirmed;
        this.deaths = data[lastIndex].Deaths;
        this.recoveries = data[lastIndex].Recovered;

        let lastCase: string = '';
        let lastDeath: string = '';

        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].Confirmed < this.cases) {
            lastCase = data[i].Date;
            break;
          }
        }
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].Deaths < this.deaths) {
            lastDeath = data[i].Date;
            break;
          }
        }
        this.daysSinceLastCase = moment(lastCase).from(moment());
        this.daysSinceLastDeath = moment(lastDeath).from(moment());
        this.prepareTimeline();
      });
  }

  getCoronaData() {
    this.covidService.getCoronaData()
      .then((data: CoronaApiResponse) => {
        this.active = data.active;
        this.critical = data.critical;
        this.tests = data.tests;
        this.casesPerOneMillion = data.casesPerOneMillion;
        this.deathsPerOneMillion = data.deathsPerOneMillion;
        this.testsPerOneMillion = data.testsPerOneMillion;
        this.todayCases = data.todayCases;
        this.todayDeaths = data.todayDeaths;
      });
  }

  getWorldData() {
    this.covidService.getWorldData()
    .then((data: WorldApiResponse) => {
      this.totalConfirmed = data.TotalConfirmed;
      this.totalDeaths= data.TotalDeaths;
      this.totalRecovered= data.TotalRecovered;
    });
  }

  prepareTimeline() {
    let confirmed = 0;
    let deaths = 0;
    let recoveries = 0;
    for(let i=0; i < this.covid19Response.length; i++) {
      let isConfirmedChange: boolean = false;;
      let isDeathsChange: boolean = false;
      let isRecoveriesChange: boolean = false;
      if(this.covid19Response[i].Confirmed > confirmed) {
        isConfirmedChange = true;
      }
      if(this.covid19Response[i].Deaths > deaths) {
        isDeathsChange = true;
      }
      if(this.covid19Response[i].Recovered > recoveries) {
        isRecoveriesChange = true;
      }
      if(isConfirmedChange || isDeathsChange || isRecoveriesChange) {
        this.timelineElements.push({
          date: new Date(moment(this.covid19Response[i].Date).format('YYYY-MM-DD')),
          newCases: (this.covid19Response[i].Confirmed - confirmed),
          newDeaths: (this.covid19Response[i].Deaths - deaths),
          newRecovered: (this.covid19Response[i].Recovered - recoveries),
          newCase: isConfirmedChange,
          newDeath: isDeathsChange,
          newRecovery: isRecoveriesChange
        });
        confirmed = this.covid19Response[i].Confirmed;
        deaths = this.covid19Response[i].Deaths;
        recoveries = this.covid19Response[i].Recovered;
      }
    }
  }
}
