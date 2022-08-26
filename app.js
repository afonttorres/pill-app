import { UI } from "./models/entities/ui.js";

class App{
    ui;
    constructor(){
        this.ui = new UI();
    }

    render(){
        this.ui.renderView();
    }
}

const app = new App();
app.render();