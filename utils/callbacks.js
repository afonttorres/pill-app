import { Pill } from "../models/entities/pill.js";
import { views } from "../models/views.js";
export const callbacks = {
    pill(data) {
        let { shape, color, name } = data.pill;
        let pill = new Pill(shape, color, name);
        let pills = localStorage.getItem('pills') ? JSON.parse(localStorage.getItem('pills')) : [];
        pills.push(pill);
        localStorage.setItem('pills', JSON.stringify(pills));
    },
    delete(e) {
        e.preventDefault();
        let pillName = e.target.parentElement.id;
        let pills = JSON.parse(localStorage.getItem('pills'));
        let found = pills.filter(p => p.name === pillName)[0];
        pills.splice(pills.indexOf(found), 1);
        localStorage.setItem('pills', JSON.stringify(pills));
        location.reload();
    },
    close() {
        return localStorage.getItem('pills') ?
            views[2].view() : views[0].view();
    },
    openPillForm() {
        return views.filter(v => v.name === "pillForm")[0].view();
    },
    openScheduleForm() {
        return views.filter(v => v.name === "scheduleForm")[0].view();
    },
    addDaysToPill(e) {
        e.preventDefault();
        e.target.classList.toggle('selected');
    },
    addScheduleToPill(e) {
        e.preventDefault();
        e.target.classList.toggle('selected');
    },
    catchScheduleData(e) {
        e.preventDefault();
        let pill = document.querySelector('.input').value;
        let days = [];
        let schedule = [];
        let selected = document.querySelectorAll('.selected');
        selected.forEach(i => i.className.includes('addDaysToPill') ? days.push(i.innerHTML) : schedule.push(i.innerHTML));
        let pills = JSON.parse(localStorage.getItem("pills"))
        let { shape, color, name } = pills.filter(p => p.name === pill)[0];
        pill = new Pill(shape, color, name);
        pill.setSchedule(days, schedule)
        pills.splice(pills.indexOf(pills.filter(p => p.name === pill.name)[0]), 1, pill);
        localStorage.removeItem("pills");
        localStorage.setItem("pills", JSON.stringify(pills));
    }
}