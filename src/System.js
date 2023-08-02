// eslint-disable-next-line import/no-cycle
import StorageController from "./Storage";

const System = (() => {
    let projectsList = [];

    const getProjectList = () => projectsList;

    const addProject = (Project) => {
        projectsList.push(Project);
        StorageController.updateStorage();
    };

    const removeProject = (project) => {
        projectsList = projectsList.filter((_project) => project !== _project);
        StorageController.updateStorage();
    };

    return { addProject, getProjectList, removeProject };
})();

export default System;
