import Task from "./Task";
import Project from "./Project";
import { System } from "./System";

export const ScreenController = (() => {
    const todoListContainer = document.getElementById("todo-list");

    const startTodoList = () => {

        const project1 = new Project("Project 1");
        const task1 = new Task('task 1', 'elo', '29.07.2023', true);
        project1.addTask(task1);
        const task2 = new Task('task 2', 'sienaaaaww', '05.08.2023', true);
        project1.addTask(task2);

        System.addProject(project1);
        // showAddProjectWindow();
        showProjects();
        addProjectBtnListener();

    };

    const addProjectBtnListener = () => {
        const addProjectBtn = document.getElementById("add-project-btn");
        const addProjectWindow = document.getElementById("add-project-window");


        addProjectBtn.addEventListener('click', () => {
            if(addProjectWindow.classList.contains("disable")) {
                showAddProjectWindow();
                addProjectWindow.classList.remove("disable");
                addProjectWindow.classList.add("active");
            } else if(addProjectWindow.classList.contains("active")) {
                closeAddProjectWindow();
                addProjectWindow.classList.remove("active");
                addProjectWindow.classList.add("disable");
            }
        });

    };

    function updateScreen(todoList) {
        todoList.forEach(task => {
            let titleDiv = document.createElement('p');
            titleDiv.innerText = task.title;

            let descriptionDiv = document.createElement('p');
            descriptionDiv.innerText = task.description;
            
            let dueDateDiv = document.createElement('p');
            dueDateDiv.innerText = task.dueDate;

            let priorityDiv = document.createElement('p');
            priorityDiv.innerText = task.priority;

            let taskAll = document.createElement('div');

            taskAll.appendChild(titleDiv);
            taskAll.appendChild(descriptionDiv);
            taskAll.appendChild(dueDateDiv);
            taskAll.appendChild(priorityDiv);

            console.log(taskAll);
            todoListContainer.appendChild(taskAll);
        });
        
    };


    const showProjects = () => {
        const aside = document.getElementById("aside");
        const projectsTitle = document.getElementById("projects-title");

        let currentProjectsList = System.getProjectList();

        for (let i = 0; i < currentProjectsList.length; i++) {
            let project = document.createElement('button');
            project.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-list-checkbox</title><path d="M21,19V17H8V19H21M21,13V11H8V13H21M8,7H21V5H8V7M4,5V7H6V5H4M3,5A1,1 0 0,1 4,4H6A1,1 0 0,1 7,5V7A1,1 0 0,1 6,8H4A1,1 0 0,1 3,7V5M4,11V13H6V11H4M3,11A1,1 0 0,1 4,10H6A1,1 0 0,1 7,11V13A1,1 0 0,1 6,14H4A1,1 0 0,1 3,13V11M4,17V19H6V17H4M3,17A1,1 0 0,1 4,16H6A1,1 0 0,1 7,17V19A1,1 0 0,1 6,20H4A1,1 0 0,1 3,19V17Z" /></svg> ${currentProjectsList[i].title}`;
            aside.appendChild(project);
        }

    };


    const showAddProjectWindow = () => {
        const addProjectBtn = document.getElementById("add-project-btn");
        const aside = document.getElementById("aside");
        const addProjectWindow = document.getElementById("add-project-window");

        let addProjectWindowContent = document.createElement('div');
        addProjectWindowContent.innerHTML = `
                                        <div id="add-project-input-control">
                                            <label for="project-title">Project title:</label>
                                            <input type="text" name="project-title" id="project-title">
                                        </div>

                                        <div id="add-project-buttons-control">
                                            <button id="btn-success">Add</button>
                                            <button id="btn-fail">Cancel</button>
                                        </div>`;
        
        addProjectWindow.appendChild(addProjectWindowContent);

    };

    const closeAddProjectWindow = () => {
        const addProjectWindow = document.getElementById("add-project-window");
        addProjectWindow.innerHTML = '';
    };

    return { startTodoList, updateScreen, showAddProjectWindow };
})();

