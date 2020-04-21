export class Covid19ApiResponse {
    Country: string;
    CountryCode: string;
    Province: string;
    City: string;
    CityCode: string;
    Lat: string;
    Lon: string;
    Confirmed: number;
    Deaths: number;
    Recovered: number;
    Active: number;
    Date: string;
}

export class CoronaApiResponse {
    updated: number;
    country: string;
    countryInfo: {
        _id: number;
        iso2: string;
        iso3: string;
        lat: number;
        long: number;
        flag: string;
    };
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    continent: string;
}

export class WorldApiResponse {
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
}