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
        
        reloadTodoList();
    };

    const reloadTodoList = () => {
        closeAddProjectWindow();
        showAddProjectButton();

        clearRenderProjects();
        renderProjects();
        addProjectBtnListener();
        loadTasksFromProject();
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

    const clearRenderProjects = () => {
        const projectsList = document.getElementById("projects-list");
        projectsList.innerHTML = '';
    };

    const renderProjects = () => {
        const aside = document.getElementById("aside");
        const projectsTitle = document.getElementById("projects-title");
        const projectsList = document.getElementById("projects-list");

        let currentProjectsList = System.getProjectList();

        for (let i = 0; i < currentProjectsList.length; i++) {
            let project = document.createElement('button');
            project.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-list-checkbox</title><path d="M21,19V17H8V19H21M21,13V11H8V13H21M8,7H21V5H8V7M4,5V7H6V5H4M3,5A1,1 0 0,1 4,4H6A1,1 0 0,1 7,5V7A1,1 0 0,1 6,8H4A1,1 0 0,1 3,7V5M4,11V13H6V11H4M3,11A1,1 0 0,1 4,10H6A1,1 0 0,1 7,11V13A1,1 0 0,1 6,14H4A1,1 0 0,1 3,13V11M4,17V19H6V17H4M3,17A1,1 0 0,1 4,16H6A1,1 0 0,1 7,17V19A1,1 0 0,1 6,20H4A1,1 0 0,1 3,19V17Z" /></svg> ${currentProjectsList[i].title}`;
            projectsList.appendChild(project);
        }

    };


    const showAddProjectWindow = () => {
        const addProjectWindow = document.getElementById("add-project-window");
        addProjectWindow.style.display = 'flex';
        addProjectWindow.classList.remove('disable');
    };

    const closeAddProjectWindow = () => {
        const addProjectWindow = document.getElementById("add-project-window");
        addProjectWindow.style.display = 'none';
        addProjectWindow.classList.add('disable');

        const projectTitle = document.getElementById("project-title");
        projectTitle.value = "";
    };

    const showAddProjectButton = () => {
        const addProjectBtn = document.getElementById("add-project-btn");
        addProjectBtn.style.display = 'flex';
    };

    const closeAddProjectButton = () => {
        const addProjectBtn = document.getElementById("add-project-btn");
        addProjectBtn.style.display = 'none';
    };



    // LISTENERS

    const addProjectBtnListener = () => {
        const addProjectBtn = document.getElementById("add-project-btn");
        const addProjectWindow = document.getElementById("add-project-window");

        addProjectBtn.addEventListener('click', () => {
            // jak okno dodawanie wyłączone, to włącza
            if(addProjectWindow.classList.contains('disable')) {
                showAddProjectWindow();
                closeAddProjectButton();
            } 
        });

        const btnSuccess = document.getElementById("btn-success");
        const btnFail = document.getElementById("btn-fail");

        // jak anuluje dodawanie nowego projektu, to wyłacza okno dodawania
        btnFail.addEventListener('click', () => {
            if(addProjectWindow.style.display === 'flex') {
                closeAddProjectWindow();
                showAddProjectButton();
            }
        });

        const projectTitle = document.getElementById("project-title");

        // jak dodaje nowy projekt, to wyłącza okno dodawania i resetuje todo list
        btnSuccess.addEventListener('click', () => {
            const newProject = new Project(projectTitle.value);
            System.addProject(newProject);
            
            reloadTodoList();
        });
    };


    const loadTasksFromProject = () => {
        const projectList = document.getElementById("projects-list");
        const projectListContent = document.querySelectorAll("#projects-list > *");
        const mainContent = document.getElementById("main-content");
        const addTaskBtn = document.getElementById("add-task-btn");
        const mainTasks = document.getElementById("main-tasks");
        
        const h2 = document.querySelector("#main-content > h2");

        for (let i = 0; i < projectListContent.length; i++) {
            projectListContent[i].addEventListener('click', () => {
                h2.innerText = "";
                mainTasks.innerHTML = '';
                
                for (let j = 0; j < projectListContent.length; j++) {
                    projectListContent[j].classList.remove("active");
                    projectListContent[j].style.fontWeight = "normal";
                }
                projectListContent[i].classList.add('active');
                projectListContent[i].style.fontWeight = "900";


                let projectArray = System.getProjectList();

                h2.innerText = projectArray[i].title;
                let taskArray = (projectArray[i]).getTaskList();
                addTaskBtn.style.display = 'flex';
                
                taskArray.forEach(element => {
                    let task = document.createElement('button');
                    task.id = "task-btn";
                    task.innerText = element.title;
                    mainTasks.appendChild(task);
                });
            });
        }
    };



    return { startTodoList, updateScreen, showAddProjectWindow };
})();

