export default class Project {
    constructor(title) {
        this.title = title;
        this.tasksList = [];
    }

    addTask(task) {
        this.tasksList.push(task);
    }

    removeTask(_task) {
        this.tasksList = this.tasksList.filter(task => task !== _task);
    }

    getTaskList = () => this.tasksList;

}