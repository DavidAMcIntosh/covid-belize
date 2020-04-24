import { Component } from '@angular/core';
import { CovidDataService } from './covid-data.service';
import { TimelineElement } from './timeline.interface';
import { Covid19ApiResponse, CoronaApiResponse, WorldApiResponse, BbcNewsApiResponse, Article } from './apis.interface';
import * as moment from 'moment';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

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
  timelineData: Array<Covid19ApiResponse> = [];

  //loading
  loading: boolean = true;

  //news
  newsToDisplay: Article = <Article>{};

  options = {
    min: 8,
    max: 100,
    ease: 'linear',
    speed: 200,
    trickleSpeed: 300,
    meteor: true,
    spinner: true,
    spinnerPosition: 'right',
    direction: 'ltr+',
    color: '#80cbc4',
    thick: false
  };

  startedClass = false;
  completedClass = false;
  preventAbuse = false;
  progressRef: NgProgressRef;

  constructor(private covidService: CovidDataService, private progress: NgProgress) { }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();
    this.loadData();
  }

  startLoading() {
    this.progressRef.start();
  }

  completeLoading() {
    this.progressRef.complete();
  }

  changeProgressColor() {
    this.progressRef.setConfig({ color: 'green' });
  }

  async loadData() {
    let covid19Response: Array<Covid19ApiResponse> = await this.getCovid19Data();
    if (covid19Response) {
      this.timelineData = covid19Response;
      let lastIndex = covid19Response.length - 1;
        this.cases = covid19Response[lastIndex].Confirmed;
        this.deaths = covid19Response[lastIndex].Deaths;
        this.recoveries = covid19Response[lastIndex].Recovered;

        let lastCase: string = '';
        let lastDeath: string = '';

        for (let i = covid19Response.length - 1; i >= 0; i--) {
          if (covid19Response[i].Confirmed < this.cases) {
            lastCase = covid19Response[i].Date;
            break;
          }
        }
        for (let i = covid19Response.length - 1; i >= 0; i--) {
          if (covid19Response[i].Deaths < this.deaths) {
            lastDeath = covid19Response[i].Date;
            break;
          }
        }
        this.daysSinceLastCase = moment(lastCase).from(moment());
        this.daysSinceLastDeath = moment(lastDeath).from(moment());
        let coronaResponse: CoronaApiResponse = await this.getCoronaData();
        if (coronaResponse) {
          this.active = coronaResponse.active;
          this.critical = coronaResponse.critical;
          this.tests = coronaResponse.tests;
          this.casesPerOneMillion = coronaResponse.casesPerOneMillion;
          this.deathsPerOneMillion = coronaResponse.deathsPerOneMillion;
          this.testsPerOneMillion = coronaResponse.testsPerOneMillion;
          this.todayCases = coronaResponse.todayCases;
          this.todayDeaths = coronaResponse.todayDeaths;

          let worldResponse: WorldApiResponse = await this.getWorldData();
          if (worldResponse) {
            this.totalConfirmed = worldResponse.TotalConfirmed;
            this.totalDeaths = worldResponse.TotalDeaths;
            this.totalRecovered = worldResponse.TotalRecovered;
          
            let bbcNewsResponse: BbcNewsApiResponse = await this.getBbcNewsData();
            if (bbcNewsResponse) {
              let newsIndex = Math.floor(Math.random() * (19 - 0 + 1) + 0);
              this.newsToDisplay = bbcNewsResponse.articles[newsIndex];
              this.prepareTimeline();
              this.progressRef.complete();
              this.loading = false;
            }
          }
        }
    }
  }

  getBbcNewsData(): Promise<any> {
    return this.covidService.getBbcNewsData();
  }

  getCovid19Data(): Promise<any> {
    return this.covidService.getCovid19Data();
  }

  getCoronaData(): Promise<any> {
    return this.covidService.getCoronaData();
  }

  getWorldData(): Promise<any> {
    return this.covidService.getWorldData();
  }

  prepareTimeline() {
    let confirmed = 0;
    let deaths = 0;
    let recoveries = 0;
    for(let i=0; i < this.timelineData.length; i++) {
      let isConfirmedChange: boolean = false;;
      let isDeathsChange: boolean = false;
      let isRecoveriesChange: boolean = false;
      if(this.timelineData[i].Confirmed > confirmed) {
        isConfirmedChange = true;
      }
      if(this.timelineData[i].Deaths > deaths) {
        isDeathsChange = true;
      }
      if(this.timelineData[i].Recovered > recoveries) {
        isRecoveriesChange = true;
      }
      if(isConfirmedChange || isDeathsChange || isRecoveriesChange) {
        this.timelineElements.push({
          date: new Date(moment(this.timelineData[i].Date).format('YYYY-MM-DD')),
          newCases: (this.timelineData[i].Confirmed - confirmed),
          newDeaths: (this.timelineData[i].Deaths - deaths),
          newRecovered: (this.timelineData[i].Recovered - recoveries),
          newCase: isConfirmedChange,
          newDeath: isDeathsChange,
          newRecovery: isRecoveriesChange
        });
        confirmed = this.timelineData[i].Confirmed;
        deaths = this.timelineData[i].Deaths;
        recoveries = this.timelineData[i].Recovered;
      }
    }
  }

  numberWithCommas(x): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

}
