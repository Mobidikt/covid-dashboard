/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
import {
  GLOBAL_LATLNG,
  GLOBAL_FLAG,
  GLOBAL_NAME,
  API_COVID_WORLD_DAILY_BASE,
  SECOND_API_COVID_BASE,
  SECOND_PATH_TO_GLOBAL_CASES,
  SECOND_PATH_TO_COUNTRY_CASES,
} from '../constants/servicesConstants'

export default class CovidService {
  _apiCovidWorldDailyBase = API_COVID_WORLD_DAILY_BASE

  _secondApiCovidBase = SECOND_API_COVID_BASE

  getCovidResource = async (url) => {
    try {
      const res = await fetch(`${this._secondApiCovidBase}${url}`)
      return await res.json()
    } catch (e) {
      const isError = true
      const address = `${this._secondApiCovidBase}${url}`
      throw new Error([isError, e, address])
    }
  }

  getCovidWorldDailyResource = async () => {
    try {
      const res = await fetch(this._apiCovidWorldDailyBase)
      return await res.json()
    } catch (e) {
      const isError = true
      const address = `${this._apiCovidWorldDailyBase}`
      throw new Error([isError, e, address])
    }
  }

  getGlobalCases = async () => {
    try {
      const res = await this.getCovidResource(SECOND_PATH_TO_GLOBAL_CASES)
      return this._extractCases(res)
    } catch (e) {
      throw new Error(e)
    }
  }

  getListOfCountriesWithFlags = async () => {
    try {
      const res = await this.getCovidResource(SECOND_PATH_TO_COUNTRY_CASES)
      return res.map(this._extractCases)
    } catch (e) {
      throw new Error(e)
    }
  }

  getCasesForWorldDaily = async () => {
    try {
      const res = await this.getCovidWorldDailyResource()
      return res.map(this._extractCasesAndDateForWorld)
    } catch (e) {
      throw new Error(e)
    }
  }

  getCasesForCountryDaily = async (iso2) => {
    try {
      const res = await this.getCovidResource(
        `/v3/covid-19/historical/${iso2}?lastdays=all`
      )
      return this._createDailyArrayForCountry(res)
    } catch (e) {
      throw new Error(e)
    }
  }

  getActualDate = async () => {
    try {
      const res = await this.getCovidResource(SECOND_PATH_TO_GLOBAL_CASES)
      const date = new Date(res.updated)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      return `${day - 1}.${month + 1}.${year}`
    } catch (e) {
      throw new Error(e)
    }
  }

  _extractCases = (object) => {
    const iso2 = object.countryInfo ? object.countryInfo.iso2 : 'world'
    const flag = object.countryInfo ? object.countryInfo.flag : GLOBAL_FLAG
    const name = object.country ? object.country : GLOBAL_NAME
    const population = object.countryInfo
      ? object.population
      : object.population
    const latlng = object.countryInfo
      ? [object.countryInfo.lat, object.countryInfo.long]
      : GLOBAL_LATLNG

    // eslint-disable-next-line consistent-return
    return {
      iso2,
      population,
      flag,
      name,
      latlng,
      total: {
        confirmed: object.cases,
        deaths: object.deaths,
        recovered: object.recovered,
      },
      new: {
        confirmed: object.todayCases,
        deaths: object.todayDeaths,
        recovered: object.todayRecovered,
      },
    }
  }

  _extractCasesAndDateForWorld = (object) => {
    return {
      name: 'world',
      confirmed: object.totalConfirmed,
      deaths: object.deaths.total,
      recovered: object.totalRecovered,
      date: object.reportDate,
    }
  }

  _createDailyArrayForCountry = (object) => {
    const dataKeys = Object.keys(object.timeline.cases)

    return dataKeys.map((key) => {
      return {
        name: object.country,
        date: new Date(key).toLocaleDateString().replace(/\./gi, '-'),
        confirmed: object.timeline.cases[key],
        deaths: object.timeline.deaths[key],
        recovered: object.timeline.recovered[key],
      }
    })
  }
}
