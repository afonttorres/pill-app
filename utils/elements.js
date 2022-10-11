import { Week } from "../models/entities/week.js";
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
        return `<h1>${str}</h1>`
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

    pills(pills) {
        console.log(pills)
        return `<div class="col">${pills.map((p) => (`<div id="${p.name}" class="row">${this.pill(p)}<i class="fa-solid fa-trash-can delete-btn"></i></div>`)).join('')}</div>`;
    },
    day(day, key) {
        return `<article class="day" id="day-${key}">
        <span>${day.name}</span>
            <div>
                Morning
                <div class="col">
                ${this.pills(day.pillsByRange('morning'))}
                </div>
            </div>
            <div>Noon
            <div class="col">
            ${this.pills(day.pillsByRange('noon'))}
            </div></div>
            <div>Afternoon
            <div class="col">
            ${this.pills(day.pillsByRange('afternoon'))}
            </div></div>
            <div>Night
            <div class="col">
            ${this.pills(day.pillsByRange('night'))}
            </div></div>
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
    }
}