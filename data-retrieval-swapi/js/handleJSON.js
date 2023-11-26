import { displayItems } from "./generateHTML.js";
import { getJSON } from "./importJSON.js";

const uri = "https://swapi.dev/api/planets/?format=json";

async function displayJSON() {
    try {
        let jsonData = await getJSON(uri);
        displayItems(jsonData); 

    } catch (error) {
        console.error('Error displaying JSON:', error);
    }
}

// Call the start function to initiate the process
export {
    // start,
    displayJSON
};