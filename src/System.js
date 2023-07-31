import { StorageController } from "./Storage";

export const System = (() => {
    let projectsList = [];

    const getProjectList = () => {
        return projectsList;
    };

    const addProject = (Project) => {
        projectsList.push(Project);
        StorageController.updateStorage();
    };

    const removeProject = (project) => {
        projectsList = projectsList.filter(_project => project !== _project);
        StorageController.updateStorage();
    };


    return { addProject, getProjectList, removeProject}
})();



