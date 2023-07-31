import { StorageController } from "./Storage";

export default class Project {
    constructor(title) {
        this.title = title;
        this.tasksList = [];
    }

    addTask(task) {
        this.tasksList.push(task);
        StorageController.updateStorage();
    }

    removeTask(_task) {
        this.tasksList = this.tasksList.filter(task => task !== _task);
        StorageController.updateStorage();
    }

    getTaskList = () => this.tasksList;

}