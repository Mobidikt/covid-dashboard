export default function calculationPopulation(item, country) {
  return Math.floor(((item * 100000) / country.population) * 1000) / 1000
}
