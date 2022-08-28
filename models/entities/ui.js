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
        view ? this.view = view : this.view = this.views.landing();
    }

    nextView = () => {
        Object.keys(views.sum).map(view => console.log(views.sum.indexOf(views.sum[view])))
    }

    setView = (view) => {
        this.view = view;
        this.renderView();
    }

    renderView = () => {
        if (!this.view) return;
        this.container.innerHTML = this.view.output;
        document.querySelector('button').onclick = this.view.callback ?
            (e) => this.view.callback(e) :
            () => this.nextView();
    }
}