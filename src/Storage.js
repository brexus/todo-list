// eslint-disable-next-line import/no-cycle
import Project from "./Project";
// eslint-disable-next-line import/no-cycle
import System from "./System";
import Task from "./Task";

const StorageController = (() => {
    const updateStorage = () => {
        localStorage.clear();
        localStorage.setItem("todo-list", JSON.stringify(System.getProjectList()));
    };

    const loadStorage = () => {
        const projectsList = JSON.parse(localStorage.getItem("todo-list"));

        if (projectsList !== null) {
            for (let i = 0; i < projectsList.length; i += 1) {
                System.addProject(new Project(projectsList[i].title));

                for (let j = 0; j < projectsList[i].tasksList.length; j += 1) {
                    (System.getProjectList()[i]).addTask(
                        new Task(
                            projectsList[i].tasksList[j].title,
                            projectsList[i].tasksList[j].description,
                            projectsList[i].tasksList[j].dueDate,
                            projectsList[i].tasksList[j].priority,
                        ),
                    );
                }
            }
        }
    };

    return { updateStorage, loadStorage };
})();

export default StorageController;
