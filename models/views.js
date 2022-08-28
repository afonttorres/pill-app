import { formContents } from "../utils/formContents.js";
import { elements } from "../utils/elements.js";
import { Form } from "./entities/form.js"
import { View } from "./entities/view.js";
import { callbacks } from "../utils/callbacks.js";
import { UI } from "./entities/ui.js";

export const views = [
    {
        name: 'landing', view: () => {
            let title = 'Pill App';
            let subtitle = 'Track your weeklye medicine intake';
            let button = 'Get started'
            let el = [elements.title(title), elements.subtitle(subtitle), elements.button(button)]
            return new View('landing', el)
        }
    }, {
        name: 'pillForm', view: () => {
            let title = 'Add a pill!';
            let form = new Form({ pill: formContents.pillForm });
            let el = [elements.title(title), elements.form(form)];
            return new View('pillForm', el, form.catchData);
        }
    }, {
        name: 'pills', view: () => {
            let title = 'Add a pill!';
            let addBtn = '+';
            let nextBtn = 'Next'
            let pills = JSON.parse(localStorage.getItem('pills'));
            let el = [elements.title(title), elements.pills(pills), elements.button(addBtn), elements.button(nextBtn)];
            return new View('pills', el, callbacks.openForm)
        }
    },{
        name: 'dayForm', view: ()=>{
            let title = 'Set your day!'
            formContents.dayForm.add_a_pill.content = JSON.parse(localStorage.getItem('pills')).map(p => p.name);
            let form = new Form({day: formContents.dayForm});
            let el = [elements.title(title), elements.form(form)];
            return new View('dayForm', el, form.catchData);
        }
    }
]