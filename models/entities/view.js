export class View {
    output;
    callback;

    constructor(elements, callback) {
        this.callback = callback;
        this.createView(elements);
    }

    createView = (elements) => {
        typeof elements !== 'string' ?
            this.output = `${elements.map(el => el).join('')}` :
            this.output = elements;
    }
}