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
        this.view = view;
        this.renderView();
    }

    addCallback = () => {
        let btn = document.querySelectorAll('button');
        let callback;

        window.onclick = (e) => {
            let target = e.path.filter(el => el.className && el.className.includes('btn'))[0];
            if (!target) return;
            let foo = target.className.split(" ").filter(i => i.includes('btn'))[0];
            foo = foo.substring(0, foo.indexOf('-btn'));
            if (!foo || !callbacks[foo]) return;
            callback = callbacks[foo];
            callback(e) && callback(e).output ? this.setView(callback(e)) : (e) => callback(e);
        }

        btn.forEach(b => {
            b.onclick = b.innerText.toLocaleLowerCase().includes('submit') && this.view.callback ?
                (e) => { this.view.callback(e); this.view.name === "pillForm" ?  this.nextView() : this.pastView()} :
                b.innerText.toLocaleLowerCase().includes('next') || b.innerText.toLocaleLowerCase().includes('get started') ?
                    () => this.nextView() : null;
        })

    }

    renderView = () => {
        if (!this.view) return;
        this.findViewIndex();
        this.container.innerHTML = this.view.output;
        this.addCallback();
    }
}