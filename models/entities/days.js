import { Pill } from "./pill.js";

export class Day {
    name;
    schedule = {};
    ranges = { morning: {}, noon: {}, afternoon: {}, night: {} };
    pillsAmount = 0;

    constructor(name) {
        this.name = name;
        this.createHours();
    }

    createHours() {
        for (let i = 0; i < 24; i++) {
            this.schedule = { ...this.schedule, [`${i}:00`]: [], [`${i}:30`]: [] };
        }
        this.addPillsToSchedule();
    }

    addPillsToSchedule() {
        if (this.schedule == {}) return;
        let pills = JSON.parse(localStorage.getItem("pills")) ? JSON.parse(localStorage.getItem("pills")) : null;
        pills.forEach(p => {
            if (!p.days || !p.schedule) return;
            if (!p.days.includes(this.name)) return;
            p.schedule.forEach(s => this.schedule[s].push(p))
        })
        this.hoursToRange()
    }

    hoursToRange() {
        Object.keys(this.schedule).map((h, k) => {
            if (k >= 40 || k < 12) this.ranges.night = { ...this.ranges.night, [h]: this.schedule[h] };
            if (k >= 13 && k < 24) this.ranges.morning = { ...this.ranges.morning, [h]: this.schedule[h] };
            if (k >= 24 && k < 28) this.ranges.noon = { ...this.ranges.noon, [h]: this.schedule[h] };
            if (k >= 28 && k < 40) this.ranges.afternoon = { ...this.ranges.afternoon, [h]: this.schedule[h] };
        })
    }

    pillsByRange(range) {
        let test = [];
        Object.keys(this.ranges[range])
            .map(h => this.ranges[range][h])
            .map(h => h.map(i => test.push(i)))
        return test;
    }

    summary() {
        let sum = {};
        Object.keys(this.schedule).filter(s => {
            if (this.schedule[s].length == 0) return;
            sum = { ...sum, [s]: this.schedule[s] }
        })
        this.pillsAmount = Object.keys(sum).reduce((acc, v) => acc + sum[v].length, 0);
        return sum;
    }
}