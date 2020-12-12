import icon from './death-star.svg';

export default class SwapiService {

  _apiBase = `https://swapi.dev/api`;
  _imageBase = `https://starwars-visualguide.com/assets/img`;

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return await res.json();
  };

  getPlanetImage = async (id) => {
    const res = await fetch(`${this._imageBase}/planets/${id}.jpg`);

    if (!res.ok) {
      return await icon;
    }
    return await res.url;
  };

  getPersonImage = async (id) => {
    const res = await fetch(`${this._imageBase}/characters/${id}.jpg`);

    return await res.url;
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results
              .map(this._transformPlanet)
              .slice(0, 5);
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results
              .map(this._transformPerson)
              .slice(0, 5);
  };

  getAllStarships= async () => {
    const res = await this.getResource(`/starships/`);
    return res.results
              .map(this._transformStarship)
              .slice(0, 5);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getStarship = async  (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = (planet) => {

    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    };
  };

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
    };
  };
};