import { Pill } from "../models/entities/pill.js";
export const callbacks = {
    pill(data) {
        let { shape, color, name, when } = data.pill;
        let pill = new Pill(shape, color, name, when);
        let pills = localStorage.getItem('pills') ? JSON.parse(localStorage.getItem('pills')) : [];
        pills.push(pill);
        localStorage.setItem('pills', JSON.stringify(pills));
    },
    delete(e){
        let pillName = e.target.parentElement.id;
        let pills = JSON.parse(localStorage.getItem('pills'));
        let found = pills.filter(p => p.name === pillName)[0];
        pills.splice(pills.indexOf(found), 1);
        localStorage.setItem('pills', JSON.stringify(pills));
        location.reload();
    }
}