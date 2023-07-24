export default class Project {
    constructor(title) {
        this.title = title;
        this.tasksList = [];
    }

    addTask(taskName) {
        this.tasksList.push(task);
    }

    removeTask(taskName) {
        this.tasksList = this.tasksList.filter(task => task.title !== taskName);
    }
    
    
}

