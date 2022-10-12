import { Week } from "../models/entities/week.js";
import { views } from "../models/views.js";
import { styleUtil } from "./style.js";

export const elements = {
    input(field, { type }) {
        return `<input class="input" name="${field}" type="${type}" placeholder="${field}"/>`
    },
    select(field, { type, content }) {
        return `<select class="input" name="${field}" type="${type}" placeholder="${field}">
        ${content.map(c => (`<option value="${c}">${c}</option>`))}
        </select>`
    },
    label(field) {
        let content = field.includes('_') ? field.split('_').join(' ') : field;
        return `<label for="${field}">${content}</label>`
    },
    formControl(fieldName, field) {
        return `<div class="form-control col">
        ${this.label(fieldName)}
        ${!field.content ? this.input(fieldName, field) : this.select(fieldName, field)}
        </div>`
    },
    form(form) {
        return `<div class="form-cnt col">
            ${this.closeButton()}
            <form class="col">
            ${Object.keys(form.fields).map(field => this.formControl(field, form.fields[field])).join('')}
            <button type="button">SUBMIT</button>
            </form>
        </div>`
    },
    title(str) {
        return `<h1 class="title">${str}</h1>`
    },
    subtitle(str) {
        return `<h5>${str}</h5>`
    },
    button(content) {
        return `<button>${content}</button>`
    },
    closeButton() {
        return `<button class="close-btn"><i class="fa-solid fa-x"></i></button>`
    },
    pill(pill) {
        let wider = ['oval', 'rectangle', 'cylinder'];
        let style = `'
            background-color: ${pill.color};
            border: 1px solid lightgray;
            border-radius: ${styleUtil.setStyles('borderRadius', pill.shape)};
            width: ${wider.includes(pill.shape) ? '50px' : '25px'};
            height: 25px;
        '`

        return `
            ${pill.shape !== 'heart' ? `<div class="pill col" style=${style}><span>${pill.name}</span></div>` : `<span style="color: ${pill.color}"><3</span>`}     
        `
    },

    pills(pills, c) {
        return `<div class="${c} col">${pills.map((p) => (`<div id="${p.name}" class="row">${this.pill(p)}<i class="fa-solid fa-trash-can delete-btn"></i></div>`)).join('')}</div>`;
    },
    range(range, day) {
        return `
        <div class="range">
            <span>${range}</span>
            ${this.pills(day.pillsByRange(range), "")}
        </div>`
    },
    ranges(day) {
        return `
        <div class="range-cnt">
            ${Object.keys(day.ranges).map(range => (this.range(range, day))).join("")}
        </div>`
    },
    day(day, key) {
        return `
        <article class="day pickDay-btn" id="day-${key}">
            <span>${day.name}</span>
            ${this.ranges(day)}
        </article>`
    },
    week(week) {
        return `<div class="week">${week.map((d, i) => (this.day(d, i))).join("")}${this.addBtn("openScheduleForm")}</div>`
    },
    addBtn(selector) {
        return `<button class="${selector}-btn"><i class="fa-regular fa-plus"></i></button>`
    },
    multiSelect(input, selector) {
        let data = input.length <= 7 ? input.map(d => d.name) : Object.keys(input);
        return `
        <div class="multiSelect-cnt">
            ${data.map(i => `<button class="${selector}-btn">${i}</button>`).join("")}
        </div>`
    },
    sheduleForm() {
        return `
        <div class="form-cnt col">
            ${this.closeButton()}
            <form class="col">
            ${this.formControl("pill", { content: JSON.parse(localStorage.getItem("pills")).map(p => p.name) })}
            ${this.multiSelect(new Week().days, 'addDaysToPill')}
            ${this.multiSelect(new Week().days[0].schedule, 'addScheduleToPill')}
            <button type="button">SUBMIT</button>
            </form>
        </div>
        `
    },
    detailDay(day){
        console.log(day)
    },
    footerItem(v, current){
        if(v.name.toLowerCase().includes("form") || v.name.toLowerCase().includes("landing")) return;
        let icons = {pills: `<i class="fa-solid fa-pills"></i>`, week: `<i class="fa-solid fa-calendar-week"></i>`, day: `<i class="fa-solid fa-calendar-day"></i>`};
        return `
        <div class="footerItem-btn ${current === v.name ? `current ${v.name}-view` : v.name+"-view"} col">
            ${icons[v.name]}
            ${v.name}
        </div>`
    },
    footer(current){
        return `<footer class="row">${views.map(v => this.footerItem(v, current)).join("")}</footer>`
    }
}