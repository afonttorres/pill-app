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
            let el = [elements.title(title), elements.subtitle(subtitle), elements.button(button)]
            console.log('hi')
            return new View('landing', el)
        }
    }, {
        name: 'pillForm', view: () => {
            let title = 'Add a pill!';
            let form = new Form({ pill: formContents.pillForm });
            let el = [elements.title(title), elements.form(form)];
            return new View('pillForm', el, (e)=>form.catchData(e));
        }
    }, {
        name: 'pills', view: () => {
            let title = 'Add a pill!';
            let addBtn = elements.addBtn("openPillForm");
            let nextBtn = 'Next'
            let pills = JSON.parse(localStorage.getItem('pills'));
            let el = [elements.title(title), elements.pills(pills), addBtn, elements.button(nextBtn)];
            return new View('pills', el)
        }
    },

    {
        name: 'week', view: () => {
            let title = 'Your week';
            let week = new Week();
            let el = [elements.title(title), elements.week(week.days)];
            return new View('week', el);
        }
    },
    {
        name: 'scheduleForm', view: () => {
            let el = [elements.title("Add to your schedule!"), elements.sheduleForm()];
            return new View('addToSchedule', el, callbacks.catchScheduleData);
        }
    }
]