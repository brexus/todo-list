import { StorageController } from "./Storage";
import Task from "./Task";

export default class Project {
    constructor(title) {
        this.title = title;
        this.tasksList = [];
    }

    addTask(task) {
        this.tasksList.push(task);

        this.tasksList.sort(function(a,b){
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        StorageController.updateStorage();
    }

    removeTask(_task) {
        this.tasksList = this.tasksList.filter(task => task !== _task);
        StorageController.updateStorage();
    }

    getTaskList = () => this.tasksList;

}