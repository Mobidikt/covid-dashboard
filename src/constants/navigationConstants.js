export const NAV_TEXT = [
  'Global cases',
  'Global deaths',
  'Global recovered',
  'Cases in the last day',
  'Deaths in the last day',
  'Recovered in the last day',
]

export const PER100 = ' per 100.000 population'
export const metricFirst = [
  { value: 0, text: 'Cases' },
  { value: 1, text: 'Deaths' },
  { value: 2, text: 'Recovered' },
]
// export const metricSecond = [
//   { value: 'casesGlobalPopulation', text: 'Cases' },
//   { value: 'deathsGlobalPopulation', text: 'Deaths' },
//   { value: 'recoveredGlobalPopulation', text: 'Recovered' },
// ]
export const metricSecond = [
  { value: 3, text: 'Cases' },
  { value: 4, text: 'Deaths' },
  { value: 5, text: 'Recovered' },
]
// export const metricFourth = [
//   { value: 'caseLastDayPopulation', text: 'Cases' },
//   { value: 'deathsLastDayPopulation', text: 'Deaths' },
//   { value: 'recoveredLastDayPopulation', text: 'Recovered' },
// ]
// const {
//   time: 'total' или 'new',
//   state: 'confirmed' или 'deaths' или 'recovered',
//   isPopulation: true или false,
// }
export const arr = [
  { time: 'total', state: 'confirmed' },
  { time: 'total', state: 'deaths' },
  { time: 'total', state: 'recovered' },
  { time: 'new', state: 'confirmed' },
  { time: 'new', state: 'deaths' },
  { time: 'new', state: 'recovered' },
]
