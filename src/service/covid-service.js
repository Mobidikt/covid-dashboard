/* eslint-disable no-return-await */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import {
  GLOBAL_POPULATION,
  GLOBAL_FLAG,
  GLOBAL_NAME,
  API_COVID_WORLD_DAILY_BASE,
  API_COVID_BASE,
  API_URL_FLAGS_AND_POPULATION,
} from '../constants/servicesConstants'

export default class CovidService {
  _apiCovidWorldDailyBase = API_COVID_WORLD_DAILY_BASE

  _apiCovidBase = API_COVID_BASE

  _apiFlagsAndPopulation = API_URL_FLAGS_AND_POPULATION

  // API COVID-19
  getCovidResource = async (url) => {
    const res = await fetch(`${this._apiCovidBase}${url}`)
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }

  // API COVID-19 world daily
  getCovidWorldDailyResource = async () => {
    const res = await fetch(this._apiCovidWorldDailyBase)

    if (!res.ok) {
      throw new Error(`Couldn't fetch Flags API, received ${res.status}`)
    }
    return await res.json()
  }

  // API Flags and Populations
  getFlagsAndPopulationResource = async () => {
    const res = await fetch(this._apiFlagsAndPopulation)

    if (!res.ok) {
      throw new Error(`Couldn't fetch Flags API, received ${res.status}`)
    }
    return await res.json()
  }

  getCases = async (data) => {
    const res = await this.getCovidResource(`summary`)
    return res[data]
  }

  getGlobalCases = async () => {
    const res = await this.getCases(`Global`)

    return this._extractCases(res)
  }

  getAllCountries = async () => {
    const res = await this.getCases(`Countries`)
    return res
  }

  getCasesForWorldDaily = async () => {
    const res = await this.getCovidWorldDailyResource()
    return res.map(this._extractCasesAndDateForWorld)
  }

  getCasesForCountryDaily = async (slug) => {
    const res = await this.getCovidResource(`total/dayone/country/${slug}`)
    return res.map(this._extractCasesAndDate)
  }

  getListOfCountries = async () => {
    const res = await this.getAllCountries()
    return res.map(this._createList)
  }

  getListOfCountriesWithFlags = async () => {
    const flags = await this.getFlagsAndPopulationResource()
    const list = await this.getListOfCountries()
    return list.map((item) => {
      const code = item.code

      const flagAndPopObj = flags.find((el) => el.alpha2Code === code)

      if (flagAndPopObj) {
        const flag = flagAndPopObj.flag
        const population = flagAndPopObj.population
        const latlng = flagAndPopObj.latlng
        return {
          ...item,
          flag,
          population,
          latlng,
        }
        // eslint-disable-next-line no-else-return
      } else {
        return item
      }
    })
  }

  getActualDate = async () => {
    const res = await this.getCases(`Date`)
    const date = new Date(res)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${day}.${month + 1}.${year}`
  }

  _createList = (item, idx) => {
    const cases = this._extractCases(item)
    return {
      ...cases,
      id: idx,
      name: item.Country,
      code: item.CountryCode,
      slug: item.Slug,
    }
  }

  _extractCases = (object) => {
    return {
      total: {
        confirmed: object.TotalConfirmed,
        deaths: object.TotalDeaths,
        recovered: object.TotalRecovered,
      },
      new: {
        confirmed: object.NewConfirmed,
        deaths: object.NewDeaths,
        recovered: object.NewRecovered,
      },
      population: GLOBAL_POPULATION,
      flag: GLOBAL_FLAG,
      name: GLOBAL_NAME,
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

  _extractCasesAndDate = (object) => {
    return {
      name: object.Country,
      confirmed: object.Confirmed,
      deaths: object.Deaths,
      recovered: object.Recovered,
      date: new Date(object.Date).toLocaleDateString(),
    }
  }
}

// const test = new CovidService().getCasesForCountryDaily('canada')
// const test2 = new CovidService().getCasesForWorldDaily()
// console.log(test)
// console.log(test2)
