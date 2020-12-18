/* eslint-disable no-return-await */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
export default class CovidService {
  GLOBAL_POPULATION = 7500000000

  GLOBAL_FLAG =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Peace_Congress_flag.svg/1500px-Peace_Congress_flag.svg.png'

  GLOBAL_NAME = 'World'

  _apiCovidBase = `https://api.covid19api.com/`

  _apiFlagsAndPopulation = `https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code;latlng;`

  // API COVID-19
  getCovidResource = async (url) => {
    const res = await fetch(`${this._apiCovidBase}${url}`)
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, received ${res.status}`)
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

    return `${day}/${month + 1}/${year}`
  }

  _createList = (item, idx) => {
    const cases = this._extractCases(item)
    return {
      ...cases,
      id: idx,
      name: item.Country,
      code: item.CountryCode,
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
      population: this.GLOBAL_POPULATION,
      flag: this.GLOBAL_FLAG,
      name: this.GLOBAL_NAME,
    }
  }
}
