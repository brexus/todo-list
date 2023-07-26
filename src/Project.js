export default class Project {
    constructor(title) {
        this.title = title;
        this.tasksList = [];
    }

    addTask(task) {
        this.tasksList.push(task);
    }

    removeTask(taskName) {
        this.tasksList = this.tasksList.filter(task => task.title !== taskName);
    }

    getTaskList = () => this.tasksList;

}