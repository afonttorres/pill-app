import { Pill } from "../models/entities/pill.js"
import { elements } from "./elements.js";

export const callbacks = {
    pill(data) {
        let { shape, color, name, when } = data.pill;
        let pill = new Pill(shape, color, name, when);
        let pills = localStorage.getItem('pills') ? JSON.parse(localStorage.getItem('pills')) : [];
        console.log(pill)
        pills.push(pill);
        localStorage.setItem('pills', JSON.stringify(pills));

        console.log(pills)

        document.querySelector('.app').innerHTML =  elements.pills(pills);

    }
}

//