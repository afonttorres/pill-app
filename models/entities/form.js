import { callbacks } from "../../utils/callbacks.js";

export class Form {
    entity;
    fields;
    output;

    constructor(data) {
        this.entity = Object.keys(data);
        this.fields = data[this.entity];
    }
    
    validate(obj) {
        let val = Object.keys(obj).filter(key => {
            if (obj[key] !== "" && obj[key] !== undefined && obj[key] !== '#000000') return;
            return key;
        })
        if (val.length === 0) return;
        return `${val.map((v, key) => key !== val.length - 1 ? v + " and " : v).join('')} not valid!`;
    }

    catchData = (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll('.input');
        let data = {};
        inputs.forEach(i => {
            data = { ...data, [i.name]: i.value }
        });

        if (this.validate(data)) {
            alert(this.validate(data));
            return;
        };
        
        this.output = { [this.entity]: data };
        callbacks[this.entity](this.output);
    }
}