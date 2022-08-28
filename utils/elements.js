import { styleUtil } from "./style.js"

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
        return `<label for="${field}">${field}</label>`
    },
    formControl(fieldName, field) {
        return `<div class="form-control col">
        ${this.label(fieldName)}
        ${!field.content ? this.input(fieldName, field) : this.select(fieldName, field)}
        </div>`
    },
    form(form) {
        return `<form class="col" onsubmit="${(e) => form.catchData(e)}">
        ${Object.keys(form.fields).map(field => this.formControl(field, form.fields[field])).join('')}
        <button type="submit">SUBMIT</button>
        </form>`
    },
    title(str) {
        return `<h1>${str}</h1>`
    },
    subtitle(str){
        return `<h5>${str}</h5>`
    },
    button(content){
        return `<button>${content}</button>`
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
            <article class="col">
            ${pill.shape !== 'heart' ? `<div style=${style}></div>` : `<span style="color: ${pill.color}"><3</span>`}
                <span>${pill.name}</span>
                <span>${pill.when}</span>
            </article>
        `
    },

    pills(pills) {
        return `<div>${pills.map(p => this.pill(p)).join('')}</div>`;
    }
}