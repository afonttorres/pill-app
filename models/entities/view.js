export class View {
    output;
    name;
    callback;


    constructor(name, elements, callback) {
        if (!name) {
            alert('Name is mandatory!');
            return;
        }
        this.name = name;
        this.callback = callback;
        this.createView(elements);
    }

    createView = (elements) => {
        typeof elements !== 'string' ?
            this.output = `${elements.map(el => el).join('')}` :
            this.output = elements;
    }
}