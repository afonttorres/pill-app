import { formContents } from "../utils/formContents.js";
import { elements } from "../utils/elements.js";
import { Form } from "./entities/form.js"
import { View } from "./entities/view.js";
import { Week } from "./entities/week.js";
import { callbacks } from "../utils/callbacks.js";

export const views = [
    {
        name: 'landing', view: () => {
            let title = 'Pill App';
            let subtitle = 'Track your weekly medicine intake';
            let button = 'Get started'
            let el = [elements.title(title), elements.subtitle(subtitle), elements.button(button), elements.footer('landing')]
            return new View('landing', el)
        }
    }, {
        name: 'pillForm', view: () => {
            let title = 'Add a pill!';
            let form = new Form({ pill: formContents.pillForm });
            let el = [elements.title(title), elements.form(form), elements.footer('pillForm')];
            return new View('pillForm', el, (e)=>form.catchData(e));
        }
    }, {
        name: 'pills', view: () => {
            let title = 'Your pills!';
            let addBtn = elements.addBtn("openPillForm");
            let pills = JSON.parse(localStorage.getItem('pills'));
            let el = [elements.title(title), elements.pills(pills, 'pills-cnt'), addBtn, elements.footer('pills')];
            return new View('pills', el)
        }
    },

    {
        name: 'week', view: () => {
            let week = new Week();
            let el = [elements.week(week.days), elements.footer('week')];
            return new View('week', el);
        }
    },
    {
        name: 'scheduleForm', view: () => {
            let el = [elements.title("Add to your schedule!"), elements.sheduleForm(), elements.footer('scheduleForm')];
            return new View('scheduleForm', el, callbacks.catchScheduleData);
        }
    },{
        name: 'day', view :(d)=>{
            let day = d ? d : new Date().getDay();
            day = new Week().dayNames[day];
            day = new Week().days.filter(d => d.name === day);
            let el = [elements.title(day[0].name), elements.detailDay(day[0]), elements.footer('day')];
            return new View('day', el);
        }
    }
]