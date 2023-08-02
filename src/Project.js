// eslint-disable-next-line import/no-cycle
import StorageController from "./Storage";

class Project {
    constructor(title) {
        this.title = title;
        this.tasksList = [];
    }

    addTask(task) {
        this.tasksList.push(task);

        this.tasksList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        StorageController.updateStorage();
    }

    removeTask(_task) {
        this.tasksList = this.tasksList.filter((task) => task !== _task);
        StorageController.updateStorage();
    }

    getTaskList = () => this.tasksList;
}

export default Project;
