export class Pill {
    shape;
    color;
    name;
    days;
    schedule;

    constructor(shape, color, name) {
        this.shape = shape;
        this.color = color;
        this.name = name;
    }

    setSchedule(days, schedule) {
        this.days = days;
        this.schedule = schedule;
    }
}