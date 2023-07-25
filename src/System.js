const System = (() => {
    let projectsList = [];

    const getProjectList = () => {
        return projectsList;
    };

    const addProject = (Project) => {
        projectsList.push(Project);
    };

    const removeProject = (project) => {
        projectsList = projectsList.filter(_project => project !== _project);
    };


    return { addProject, getProjectList, removeProject}
})();



export { System };

