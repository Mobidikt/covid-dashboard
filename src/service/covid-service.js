/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class CovidService {
  // uMap = new Map([
  //   ['Cape Verde', 'Cabo Verde'],
  //   ['Congo (Brazzaville)', 'Congo'],
  //   ['Congo (Kinshasa)', 'Congo (Democratic Republic of the)'],
  //   ['Iran, Islamic Republic of', 'Iran (Islamic Republic of)'],
  //   ['Korea (South)', 'Korea (Republic of)'],
  //   ['Lao PDR', `Lao People's Democratic Republic`],
  //   ['Macao, SAR China', 'Macao'],
  //   ['Macedonia, Republic of', 'Macedonia (the former Yugoslav Republic of)'],
  //   ['Palestinian Territory', 'Palestine, State of'],
  //   ['Taiwan, Republic of China', 'Taiwan'],
  //   ['Venezuela (Bolivarian Republic)', 'Venezuela (Bolivarian Republic of)'],
  //   ['Syrian Arab Republic (Syria)', 'Syrian Arab Republic'],
  //   ['Saint Vincent and Grenadines', 'Saint Vincent and the Grenadines'],
  //   ['Holy See (Vatican City State)', 'Holy See'],
  // ])

  _apiCovidBase = `https://api.covid19api.com/`

  // _apiFlagsAndPopulation = `https://restcountries.eu/rest/v2/all?fields=name;population;flag`
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
      // const name = this.uMap.get(item.name)
      //   ? this.uMap.get(item.name)
      //   : item.name
      const code = item.code

      // const flagAndPopObj = flags.find((el) => el.name === name)
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
    }
  }
}
