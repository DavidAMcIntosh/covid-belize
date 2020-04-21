import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  covid19Url = 'https://api.covid19api.com/country/belize?from=2020-01-22T00:00:00Z&to=';
  coronaUrl = 'https://corona.lmao.ninja/v2/countries/Belize';
  worldUrl = 'https://api.covid19api.com/world/total';
  constructor(private http: HttpClient) { }

  getCovid19Data() {
    let currentDate = moment().format();
    let endpoint = this.covid19Url + currentDate;
    return this.http.get(endpoint).toPromise();
  }

  getCoronaData() {
    return this.http.get(this.coronaUrl).toPromise();
  }

  getWorldData() {
    return this.http.get(this.worldUrl).toPromise();
  }
}
