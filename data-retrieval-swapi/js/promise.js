import { displayItems } from "./generateHTML.js";
import { displayJSON } from "./handleJSON.js";

const btn = document.querySelector("button");

btn.addEventListener(
  "click",
  () => {
    displayJSON();
  
    btn.remove();
  }
);	