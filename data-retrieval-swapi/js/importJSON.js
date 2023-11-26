async function getJSON(uri) {
    try {
        let response = await fetch(uri);
        let data = await response.json();
        let planetObject = data.results;
        const planets = Object.values(planetObject);
        return planets;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getJSONresidents(uri) {
    try {
        let response = await fetch(uri);
        let data = await response.json();
        let residents = data.name;
        return residents
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getJSONfilms(uri) {
    try {
        let response = await fetch(uri);
        let data = await response.json();
        let films = data.title;
        return films
    } catch (error) {
        console.error('Error:', error);
    }
}

export {
    getJSON,
    getJSONresidents,
    getJSONfilms
}