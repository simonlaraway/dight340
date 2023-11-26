import { displayJSON } from "./handleJSON.js";
import { getJSON } from "./importJSON.js";
import { getJSONresidents } from "./importJSON.js";
import { getJSONfilms } from "./importJSON.js";

const uri = "https://swapi.dev/api/planets/?format=json";

async function displayItems(planets) {
    //do manipulations up here to get objects for each respective planet

    let residents = await getResidents();
    const residentsByPlanet = {};

    // Iterate through the residentsData array and organize residents by planet name
    residents.forEach(item => {
        const { planetName, residentName } = item;
        if (!residentsByPlanet[planetName]) {
            residentsByPlanet[planetName] = [];
        }
        residentsByPlanet[planetName].push(" " + residentName);
    });

    let films = await getFilms();
    const filmsByPlanet = {};

    // Iterate through the filmData array and organize residents by planet name
    films.forEach(item => {
        const { planetName, filmName } = item;
        if (!filmsByPlanet[planetName]) {
            filmsByPlanet[planetName] = [];
        }
        filmsByPlanet[planetName].push(" " + filmName);
    });

    
    for (const planet of planets) {
        try {
            const biggerdiv = document.createElement("div");
            biggerdiv.classList.add("biggerdiv");

            const planetdiv = document.createElement("div");
            planetdiv.classList.add("planetdiv");

            const elementsdiv = document.createElement("div");
            elementsdiv.classList.add("elements");

            const name = document.createElement("h2");
            name.textContent = "Name: " + planet.name;

            const climate = document.createElement("p");
            climate.textContent = "Climate: " + planet.climate;

            const terrain = document.createElement("p");
            terrain.textContent = "Terrain: " + planet.terrain;

            const population = document.createElement("p");
            population.textContent = "Population: " + planet.population;

            const residents = document.createElement("p");
            residents.textContent = "Residents: " + residentsByPlanet[planet.name];

            const films = document.createElement("p");
            films.textContent = "Films that took place here: " + filmsByPlanet[planet.name];

           

            elementsdiv.appendChild(name);
            elementsdiv.appendChild(population);
            elementsdiv.appendChild(terrain);
            elementsdiv.appendChild(climate);
            elementsdiv.appendChild(residents);
            elementsdiv.appendChild(films);

            planetdiv.appendChild(elementsdiv);
            biggerdiv.appendChild(planetdiv);
            document.body.appendChild(biggerdiv);
        } catch (error) {
            console.error(error);
        }
    }
}

async function getResidents() {
    let jsonData = await getJSON(uri);
    const promises = jsonData.map(async planet => {
        if (planet.residents !== '') { // if the planet has residents, continue
            let residents = planet.residents;
            return Promise.all(residents
                .filter(residenturl => residenturl !== '')
                .map(async residenturl => {
                    let residentName = await getJSONresidents(residenturl);
                    let planetName = planet.name;
                    return { planetName, residentName };
                }));
        }
    });

    const residentArrays = await Promise.all(promises);
    // Flatten the array of arrays into a single array
    const flattenedResidents = residentArrays.flat();
    return flattenedResidents;
}

async function getFilms () {
    let jsonData = await getJSON(uri);
    const promises = jsonData.map(async planet => {
        if (planet.films !== '') { // if the planet has residents, continue
            let films = planet.films;
            return Promise.all(films
                .filter(filmurl => filmurl !== '')
                .map(async filmurl => {
                    let filmName = await getJSONfilms(filmurl);
                    let planetName = planet.name;
                    return { planetName, filmName };
                }));
        }
    });
    const residentArrays = await Promise.all(promises);
    // Flatten the array of arrays into a single array
    const flattenedResidents = residentArrays.flat();
    return flattenedResidents;
}

export {
    displayItems
}
