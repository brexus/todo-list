import Task from "./Task";
import Project from "./Project";
import { System } from "./System";

export const ScreenController = (() => {
    const todoListContainer = document.getElementById("todo-list");

    let currentProject;

    const startTodoList = () => {

        const project1 = new Project("Project 1");
        const task1 = new Task('task 1', 'elo', '29.07.2023', true);
        project1.addTask(task1);
        const task2 = new Task('task 2', 'sienaaaaww', '05.08.2023', true);
        project1.addTask(task2);
        System.addProject(project1);
        
        firstLoad();
    };

    const firstLoad = () => {
        reloadAside();
        clearMain();

        addTaskBtnListener();
        addProjectBtnListener();

    };

    const reloadAside = () => {
        clearRenderProjects();
        renderProjects();
        closeAddProjectWindow();
        showAddProjectButton();
        loadTasksFromProjectListener();
    };
    
    const clearMain = () => {
        const mainTasks = document.getElementById("main-tasks");
        const h2 = document.querySelector("#main-content > h2");
        mainTasks.innerHTML = "";
        h2.innerHTML = "";
        closeAddTaskWindow();
        closeAddTaskButton();
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

    const showAddTaskWindow = () => {
        const addTaskWindow = document.getElementById("add-task-window");
        addTaskWindow.style.display = 'flex';
        addTaskWindow.classList.remove('disable');
    };

    const closeAddTaskWindow = () => {
        const addTaskWindow = document.getElementById("add-task-window");
        addTaskWindow.style.display = 'none';
        addTaskWindow.classList.add('disable');

        // const projectTitle = document.getElementById("task-title");
        // projectTitle.value = "";

        // const projectDescription = document.getElementById("task-description");
        // projectDescription.value = "";

        // const projectDueData = document.getElementById("task-due-data");
        // projectDueData.value = "";
    };

    const showAddTaskButton = () => {
        const addTaskBtn = document.getElementById("add-task-btn");
        addTaskBtn.style.display = 'flex';
    };

    const closeAddTaskButton = () => {
        const addTaskBtn = document.getElementById("add-task-btn");
        addTaskBtn.style.display = 'none';
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

        const btnSuccess = document.querySelector("#add-project-buttons-control > .btn-success");
        const btnFail = document.querySelector("#add-project-buttons-control > .btn-fail");

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
            
            loadTasksFromProjectListener();
            reloadAside();

        });
    };


    const addTaskBtnListener = () => {
        const addTaskBtn = document.getElementById("add-task-btn");
        const addTaskWindow = document.getElementById("add-task-window");

        addTaskBtn.addEventListener('click', () => {
            // jak okno dodawanie wyłączone, to włącza
            if(addTaskWindow.classList.contains('disable')) {
                showAddTaskWindow();
                closeAddTaskButton();
            } 
        });

        const btnSuccess = document.querySelector("#add-task-buttons-control > .btn-success");
        const btnFail = document.querySelector("#add-task-buttons-control > .btn-fail");

        // jak anuluje dodawanie nowego projektu, to wyłacza okno dodawania
        btnFail.addEventListener('click', () => {
            if(addTaskWindow.style.display === 'flex') {
                closeAddTaskWindow();
                showAddTaskButton();
                
            }
        });

        const taskTitle = document.getElementById("task-title");
        const taskDescription = document.getElementById("task-description");
        const taskDueDate = document.getElementById("task-due-date");

        // jak dodaje nowy projekt, to wyłącza okno dodawania i resetuje todo list
        btnSuccess.addEventListener('click', () => {
            currentProject.addTask(new Task(taskTitle.value, taskDescription.value, taskDueDate.value, false));
            
            reloadTasks();

            //reloadTasksFromCurrentProject();
        });
    };




    const loadTasksFromProjectListener = () => {
        const projectListAside = document.querySelectorAll("#projects-list > *");

        for (let i = 0; i < projectListAside.length; i++) {
            projectListAside[i].addEventListener('click', () => {
                // Ustawianie aktualnie wybranego projektu
                currentProject = (System.getProjectList())[i];

                // Pogrubienie napisu wybranego projektu
                for (let j = 0; j < projectListAside.length; j++) {
                    projectListAside[j].classList.remove("active");
                    projectListAside[j].style.fontWeight = "normal";
                }
                projectListAside[i].classList.add('active');
                projectListAside[i].style.fontWeight = "600";
                
                // reloadAside();
                reloadTasks();
                
            });
        }
    };

    const reloadTasks = () => {
        const h2 = document.querySelector("#main-content > h2");
        const mainTasks = document.getElementById("main-tasks");

        clearMain();

        h2.innerHTML = currentProject.title;
        let taskList = currentProject.getTaskList();
        
        taskList.forEach(element => {
            let task = document.createElement('button');
            task.style.display = 'flex';
            task.style.flexDirection = 'row';
            task.id = "task-btn";
            task.innerHTML = `<input type='checkbox' class='task-checkbox'> ${element.title}`
            // task.innerText = element.title;
            mainTasks.appendChild(task);
        });

        showAddTaskButton();
    };


    return { startTodoList };
})();

