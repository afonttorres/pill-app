import { views } from "../views.js";

export class UI {
    container = document.querySelector('.app');
    views = views;
    view;

    constructor(view) {
        if (view) {
            this.view = view;
            return;
        }
        view ? this.view = view : this.view = this.views.pillForm();
    }

    setView = (view) => {
        this.view = view;
        this.renderView();
    }

    renderView = () => {
        if (!this.view) return;
        this.container.innerHTML = this.view.output;
        if (!this.view.callback) return;
        document.querySelector('button').onclick = (e) => this.view.callback(e);
    }
}