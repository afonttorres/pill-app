import { formContents } from "../utils/formContents.js";
import { elements } from "../utils/elements.js";
import { Form } from "./entities/form.js"
import { View } from "./entities/view.js";

export const views = {
    pillForm() {
        let title = 'Add a pill!';
        let form = new Form({ pill: formContents.pillForm });
        let el = [elements.title(title), elements.form(form)];
        return new View(el, form.catchData);
    }
}