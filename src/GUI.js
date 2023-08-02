/* eslint-disable no-alert */
import Task from "./Task";
import Project from "./Project";
import System from "./System";
import StorageController from "./Storage";

const ScreenController = (() => {
    let currentProject;

    const startTodoList = () => {
    // const project1 = new Project("Test 1");
    // const task1 = new Task('task 1', 'Lorem apsem impum alerte', '2023-07-29', false);
    // project1.addTask(task1);
    // const task2 = new Task('task 2', 'sienaaaaww', '2023-08-05', false);
    // project1.addTask(task2);
    // System.addProject(project1);

        firstLoad();
    };

    const firstLoad = () => {
        StorageController.loadStorage();
        reloadAside();
        clearMain();
        addTaskBtnListener();
        addProjectBtnListener();
        taskDetailCloseListener();
        hamburgerListener();
    };

    const reloadAside = () => {
        clearRenderProjects();
        renderProjects();
        closeAddProjectWindow();
        showAddProjectButton();
        loadTasksFromProjectListener();
        deleteProjectListener();
    };

    const clearMain = () => {
        const mainTasks = document.getElementById("main-tasks");
        const h2 = document.querySelector("#main-content > h2");
        mainTasks.innerHTML = "";
        h2.innerHTML = "";
        closeAddTaskWindow();
        closeAddTaskButton();
        closeTaskSeparator();
        closeTaskDetailsWindow();
        document.getElementById("tasks-legend").innerHTML = "";
    };

    const clearRenderProjects = () => {
        const projectsList = document.getElementById("projects-list");
        projectsList.innerHTML = "";
    };

    const renderProjects = () => {
        const projectsList = document.getElementById("projects-list");

        const currentProjectsList = System.getProjectList();

        for (let i = 0; i < currentProjectsList.length; i += 1) {
            const project = document.createElement("button");
            project.innerHTML = `<div style='width:100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-list-checkbox</title><path d="M21,19V17H8V19H21M21,13V11H8V13H21M8,7H21V5H8V7M4,5V7H6V5H4M3,5A1,1 0 0,1 4,4H6A1,1 0 0,1 7,5V7A1,1 0 0,1 6,8H4A1,1 0 0,1 3,7V5M4,11V13H6V11H4M3,11A1,1 0 0,1 4,10H6A1,1 0 0,1 7,11V13A1,1 0 0,1 6,14H4A1,1 0 0,1 3,13V11M4,17V19H6V17H4M3,17A1,1 0 0,1 4,16H6A1,1 0 0,1 7,17V19A1,1 0 0,1 6,20H4A1,1 0 0,1 3,19V17Z" /></svg>
                                    ${currentProjectsList[i].title}
                                </div>

                                <svg class='project-close' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                                `;
            projectsList.appendChild(project);
        }
    };

    const deleteProjectListener = () => {
        const projectClose = document.querySelectorAll(".project-close");

        for (let i = 0; i < projectClose.length; i += 1) {
            projectClose[i].addEventListener("click", () => {
                System.removeProject((System.getProjectList())[i]);
                reloadAside();
                clearMain();
            });
        }
    };

    const showAddProjectWindow = () => {
        const addProjectWindow = document.getElementById("add-project-window");
        addProjectWindow.style.display = "flex";
        addProjectWindow.classList.remove("disable");
    };

    const closeAddProjectWindow = () => {
        const addProjectWindow = document.getElementById("add-project-window");
        addProjectWindow.style.display = "none";
        addProjectWindow.classList.add("disable");

        const projectTitle = document.getElementById("project-title");
        projectTitle.value = "";
    };

    const showAddProjectButton = () => {
        const addProjectBtn = document.getElementById("add-project-btn");
        addProjectBtn.style.display = "flex";
    };

    const closeAddProjectButton = () => {
        const addProjectBtn = document.getElementById("add-project-btn");
        addProjectBtn.style.display = "none";
    };

    const showAddTaskWindow = () => {
        const addTaskWindow = document.getElementById("add-task-window");
        addTaskWindow.style.display = "flex";
        addTaskWindow.classList.remove("disable");
    };

    const closeAddTaskWindow = () => {
        const addTaskWindow = document.getElementById("add-task-window");
        addTaskWindow.style.display = "none";
        addTaskWindow.classList.add("disable");

        const projectTitle = document.getElementById("task-title");
        projectTitle.value = "";

        const projectDescription = document.getElementById("task-description");
        projectDescription.value = "";

    // const projectDueData = document.getElementById("task-due-data");
    // projectDueData.value = "";
    };

    const showAddTaskButton = () => {
        const addTaskBtn = document.getElementById("add-task-btn");
        addTaskBtn.style.display = "flex";
    };

    const closeAddTaskButton = () => {
        const addTaskBtn = document.getElementById("add-task-btn");
        addTaskBtn.style.display = "none";
    };

    const showTaskSeparator = () => {
        const separator = document.querySelector("#main-content > div.separator");
        separator.style.display = "flex";
    };

    const closeTaskSeparator = () => {
        const separator = document.querySelector("#main-content > div.separator");
        separator.style.display = "none";
    };

    // LISTENERS

    const addProjectBtnListener = () => {
        const addProjectBtn = document.getElementById("add-project-btn");
        const addProjectWindow = document.getElementById("add-project-window");

        addProjectBtn.addEventListener("click", () => {
            // jak okno dodawanie wyłączone, to włącza
            if (addProjectWindow.classList.contains("disable")) {
                showAddProjectWindow();
                closeAddProjectButton();
            }
        });

        const btnSuccess = document.querySelector(".add-project-buttons-control > .btn-success");
        const btnFail = document.querySelector(".add-project-buttons-control > .btn-fail");

        // jak anuluje dodawanie nowego projektu, to wyłacza okno dodawania
        btnFail.addEventListener("click", () => {
            if (addProjectWindow.style.display === "flex") {
                closeAddProjectWindow();
                showAddProjectButton();
            }
        });

        const projectTitle = document.getElementById("project-title");

        let control;

        // jak dodaje nowy projekt, to wyłącza okno dodawania i resetuje todo list
        btnSuccess.addEventListener("click", () => {
            if (projectTitle.value.trim() !== "") {
                const projectList = System.getProjectList();
                control = 0;

                projectList.forEach((project) => {
                    if (project.title.trim() !== projectTitle.value.trim()) {
                        control += 1;
                    }
                });

                if (control === projectList.length) {
                    const newProject = new Project(projectTitle.value);
                    System.addProject(newProject);
                    loadTasksFromProjectListener();
                    reloadAside();
                    clearMain();
                    // StorageController.updateStorage();
                } else {
                    // eslint-disable-next-line no-alert
                    alert("The title is already taken");
                }
            } else {
                // eslint-disable-next-line no-alert
                alert("The title cannot be empty");
            }
            control = 0;
        });
    };

    const addTaskBtnListener = () => {
        const addTaskBtn = document.getElementById("add-task-btn");
        const addTaskWindow = document.getElementById("add-task-window");

        addTaskBtn.addEventListener("click", () => {
            // jak okno dodawanie wyłączone, to włącza
            if (addTaskWindow.classList.contains("disable")) {
                showAddTaskWindow();
                closeAddTaskButton();
            }
        });

        const btnSuccess = document.querySelector(".add-task-buttons-control > .btn-success");
        const btnFail = document.querySelector(".add-task-buttons-control > .btn-fail");

        // jak anuluje dodawanie nowego projektu, to wyłacza okno dodawania
        btnFail.addEventListener("click", () => {
            if (addTaskWindow.style.display === "flex") {
                closeAddTaskWindow();
                showAddTaskButton();
            }
        });

        const taskTitle = document.getElementById("task-title");
        const taskDescription = document.getElementById("task-description");
        const taskDueDate = document.getElementById("task-due-date");

        // jak dodaje nowy projekt, to wyłącza okno dodawania i resetuje todo list
        btnSuccess.addEventListener("click", () => {
            // if(taskTitle.value.trim() !== "") {
            //     currentProject.addTask(new Task(taskTitle.value
            // taskDescription.value, taskDueDate.value, false));
            //     reloadTasks();
            // }

            if (taskTitle.value.trim() !== "") {
                currentProject.addTask(
                    new Task(taskTitle.value, taskDescription.value, taskDueDate.value, false),
                );
                reloadTasks();
            } else {
                alert("The title cannot be empty");
            }
        });
    };

    const loadTasksFromProjectListener = () => {
        const projectListAside = document.querySelectorAll("#projects-list > button > div");

        const a = (i) => {
            // Ustawianie aktualnie wybranego projektu
            currentProject = (System.getProjectList())[i];

            // Pogrubienie napisu wybranego projektu
            for (let j = 0; j < projectListAside.length; j += 1) {
                projectListAside[j].classList.remove("active");
                projectListAside[j].style.fontWeight = "normal";
            }
            projectListAside[i].classList.add("active");
            projectListAside[i].style.fontWeight = "600";

            // reloadAside();
            reloadTasks();
        };

        for (let i = 0; i < projectListAside.length; i += 1) {
            projectListAside[i].addEventListener("click", a(i));
        }
    };

    const reloadTasks = () => {
        const h2 = document.querySelector("#main-content > h2");
        const mainTasks = document.getElementById("main-tasks");
        const tasksLegend = document.getElementById("tasks-legend");

        clearMain();

        h2.innerText = currentProject.title;
        const taskList = currentProject.getTaskList();

        tasksLegend.innerHTML = "<h4>Title:</h4><h4>Due date:</h4>";

        taskList.forEach((element) => {
            const task = document.createElement("button");
            task.style.display = "flex";
            task.style.flexDirection = "row";
            // task.style.justifyContent = 'space-between';
            task.id = "task-btn";
            task.innerHTML = `<input type='checkbox' class='task-checkbox'>
                                <span class='task-date-container' style='display:flex; flex-direction: row; justify-content: space-between; width: 100%;'>
                                    <span>${element.title}</span>
                                    <span>${element.dueDate}</span>
                                </span>`;
            mainTasks.appendChild(task);
        });

        showTaskSeparator();
        showAddTaskButton();
        checkboxListener();
        taskDetailsWindowListeners();
    };

    const checkboxListener = () => {
        const taskButton = document.querySelectorAll("#task-btn > input");

        const a = (i) => {
            const task = (currentProject.getTaskList())[i];
            currentProject.removeTask(task);
            reloadTasks();
        };

        for (let i = 0; i < taskButton.length; i += 1) {
            taskButton[i].addEventListener("click", a(i));
        }
    };

    const taskDetailsWindowListeners = () => {
        const taskBtns = document.querySelectorAll(".task-date-container");

        const titleDetail = document.getElementById("title-detail-window");
        const dueDateDetail = document.getElementById("due-date-detail-window");
        const descriptionDetail = document.getElementById("description-detail-window");

        const a = (i) => {
            showTaskDetailsWindow();
            const task = (currentProject.getTaskList())[i];
            // console.log(task);
            titleDetail.innerText = `'${task.title}'`;
            dueDateDetail.innerText = `${task.dueDate}`;
            descriptionDetail.innerText = `'${task.description}'`;
        };

        for (let i = 0; i < taskBtns.length; i += 1) {
            taskBtns[i].addEventListener("click", a(i));
        }
    };

    const showTaskDetailsWindow = () => {
        const descriptionWindow = document.getElementById("details-window");
        descriptionWindow.style.display = "flex";

        const content = document.getElementById("main-aside-container");
        content.classList.add("disable-background");
    };

    const closeTaskDetailsWindow = () => {
        const descriptionWindow = document.getElementById("details-window");
        descriptionWindow.style.display = "none";

        const content = document.getElementById("main-aside-container");
        content.classList.remove("disable-background");
    };

    const taskDetailCloseListener = () => {
        const close = document.getElementById("btn-description-close");

        close.addEventListener("click", () => {
            closeTaskDetailsWindow();
        });
    };

    const hamburgerListener = () => {
        const hamburger = document.getElementById("hamburger");
        const aside = document.getElementById("aside");

        hamburger.addEventListener("click", () => {
            if (aside.classList.contains("active")) {
                closeAsideMenu();
                hamburger.innerHTML = "<title>menu</title><path d=\"M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z\" />";
            } else {
                openAsideMenu();
                hamburger.innerHTML = "<title>close</title><path d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\" />";
            }
        });
    };

    const closeAsideMenu = () => {
        const aside = document.getElementById("aside");
        aside.classList.remove("active");

        // aside.style.transform = 'scale(0)';
        // aside.style.transition = "1s";

        aside.style.animation = "slideOut 300ms";
        aside.style.display = "none";

    // window.setTimeout(() => {
    // }, 2000);
    };

    const openAsideMenu = () => {
        const aside = document.getElementById("aside");
        aside.classList.add("active");

        // aside.style.transform = 'scale(1)';
        // aside.style.transition = "4s ease-in";
        aside.style.display = "flex";

        aside.style.animation = "slideIn 300ms";

    // aside.style.display = 'flex';
    };

    return { startTodoList };
})();

export default ScreenController;
