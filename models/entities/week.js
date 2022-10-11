import { Day } from "./days.js";

export class Week {
    dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days;
    constructor(){
        this.days = this.dayNames.map(d => new Day(d));
        console.log(this.days)
    }
}