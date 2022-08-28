import { formContents } from "../utils/formContents.js";
import { elements } from "../utils/elements.js";
import { Form } from "./entities/form.js"
import { View } from "./entities/view.js";

export const views = {
    landing() {
        let title = 'Pill App';
        let subtitle = 'Track your weeklye medicine intake';
        let button = 'Get started'
        let el = [elements.title(title), elements.subtitle(subtitle), elements.button(button)]
        return new View(el)
    },
    pillForm() {
        let title = 'Add a pill!';
        let form = new Form({ pill: formContents.pillForm });
        let el = [elements.title(title), elements.form(form)];
        return new View(el, form.catchData);
    },
    sum: [
        {landing: () => this.landing()},
        {pillForm : () => this.pillForm()}
    ]
}