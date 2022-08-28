import { callbacks } from "../../utils/callbacks.js";
import { views } from "../views.js";

export class UI {
    container = document.querySelector('.app');
    views = views;
    index;
    view;
    s = 3;
    ms = 3 * 1000;

    constructor(view) {
        console.log(view)
        if (view) {
            this.view = view;
            return;
        }
        this.view = view ?
            view :
            localStorage.getItem('pills') ?
                this.views[2].view() :
                this.views[0].view();
    }

    findViewIndex = () => {
        let view = this.views.filter((v) => v.name === this.view.name)[0];
        this.index = this.views.indexOf(view);
    }

    nextView = () => {
        let nextView = this.index + 1 < this.views.length - 1 ? this.views[this.index + 1] : this.views[this.views.length - 1];
        this.setView(nextView.view())
    }

    pastView = () => {
        let pastView = this.index - 1 >= 0 ? this.views[this.index - 1] : this.views[0];
        this.setView(pastView.view())
    }

    setView = (view) => {
        console.log(view)
        this.view = view;
        this.renderView();
    }

    addCallback = () => {
        let btn = document.querySelectorAll('button');
        btn.forEach(b => {
            b.innerText.toLocaleLowerCase().includes('next') || btn.length <= 1 ?
                b.onclick = this.view.callback ? (e) => { this.view.callback(e); this.nextView() } : () => this.nextView()
                :
                b.onclick = () => this.pastView();
        })

        window.onclick = (e) => {
            if (!e.target.className.includes('btn')) return;
            let foo = e.target.className.substring(e.target.className.lastIndexOf(' ') + 1, e.target.className.indexOf('-btn'));
            callbacks[foo](e);
        }
    }

    renderView = () => {
        if (!this.view) return;
        this.findViewIndex();
        this.container.innerHTML = this.view.output;
        this.addCallback();
    }
}