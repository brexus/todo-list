(()=>{"use strict";class t{constructor(t,e,n,s){this.title=t,this.description=e,this.dueDate=n,this.priority=s}}class e{constructor(t){this.title=t,this.tasksList=[]}addTask(t){this.tasksList.push(t)}removeTask(t){this.tasksList=this.tasksList.filter((e=>e!==t))}getTaskList=()=>this.tasksList}const n=(()=>{let t=[];return{addProject:e=>{t.push(e)},getProjectList:()=>t,removeProject:e=>{t=t.filter((t=>e!==t))}}})();(()=>{let s;document.getElementById("todo-list");const d=()=>{o(),c(),i(),a(),k()},l=()=>{const t=document.getElementById("main-tasks"),e=document.querySelector("#main-content > h2");t.innerHTML="",e.innerHTML="",r(),u(),y(),B(),document.getElementById("tasks-legend").innerHTML=""},o=()=>{document.getElementById("projects-list").innerHTML=""},c=()=>{document.getElementById("aside"),document.getElementById("projects-title");const t=document.getElementById("projects-list");let e=n.getProjectList();for(let n=0;n<e.length;n++){let s=document.createElement("button");s.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-list-checkbox</title><path d="M21,19V17H8V19H21M21,13V11H8V13H21M8,7H21V5H8V7M4,5V7H6V5H4M3,5A1,1 0 0,1 4,4H6A1,1 0 0,1 7,5V7A1,1 0 0,1 6,8H4A1,1 0 0,1 3,7V5M4,11V13H6V11H4M3,11A1,1 0 0,1 4,10H6A1,1 0 0,1 7,11V13A1,1 0 0,1 6,14H4A1,1 0 0,1 3,13V11M4,17V19H6V17H4M3,17A1,1 0 0,1 4,16H6A1,1 0 0,1 7,17V19A1,1 0 0,1 6,20H4A1,1 0 0,1 3,19V17Z" /></svg> ${e[n].title}`,t.appendChild(s)}},i=()=>{const t=document.getElementById("add-project-window");t.style.display="none",t.classList.add("disable"),document.getElementById("project-title").value=""},a=()=>{document.getElementById("add-project-btn").style.display="flex"},r=()=>{const t=document.getElementById("add-task-window");t.style.display="none",t.classList.add("disable")},m=()=>{document.getElementById("add-task-btn").style.display="flex"},u=()=>{document.getElementById("add-task-btn").style.display="none"},y=()=>{document.querySelector("#main-content > div.separator").style.display="none"},p=()=>{const t=document.getElementById("add-project-btn"),s=document.getElementById("add-project-window");t.addEventListener("click",(()=>{s.classList.contains("disable")&&((()=>{const t=document.getElementById("add-project-window");t.style.display="flex",t.classList.remove("disable")})(),document.getElementById("add-project-btn").style.display="none")}));const o=document.querySelector(".add-project-buttons-control > .btn-success");document.querySelector(".add-project-buttons-control > .btn-fail").addEventListener("click",(()=>{"flex"===s.style.display&&(i(),a())}));const c=document.getElementById("project-title");o.addEventListener("click",(()=>{const t=new e(c.value);n.addProject(t),k(),d(),l()}))},g=()=>{const e=document.getElementById("add-task-btn"),n=document.getElementById("add-task-window");e.addEventListener("click",(()=>{n.classList.contains("disable")&&((()=>{const t=document.getElementById("add-task-window");t.style.display="flex",t.classList.remove("disable")})(),u())}));const d=document.querySelector(".add-task-buttons-control > .btn-success");document.querySelector(".add-task-buttons-control > .btn-fail").addEventListener("click",(()=>{"flex"===n.style.display&&(r(),m())}));const l=document.getElementById("task-title"),o=document.getElementById("task-description"),c=document.getElementById("task-due-date");d.addEventListener("click",(()=>{s.addTask(new t(l.value,o.value,c.value,!1)),E()}))},k=()=>{const t=document.querySelectorAll("#projects-list > *");for(let e=0;e<t.length;e++)t[e].addEventListener("click",(()=>{s=n.getProjectList()[e];for(let e=0;e<t.length;e++)t[e].classList.remove("active"),t[e].style.fontWeight="normal";t[e].classList.add("active"),t[e].style.fontWeight="600",E()}))},E=()=>{const t=document.querySelector("#main-content > h2"),e=document.getElementById("main-tasks"),n=document.getElementById("tasks-legend");l(),t.innerHTML=s.title;let d=s.getTaskList();n.innerHTML="<h4>Title:</h4><h4>Due date:</h4>",d.forEach((t=>{let n=document.createElement("button");n.style.display="flex",n.style.flexDirection="row",n.id="task-btn",n.innerHTML=`<input type='checkbox' class='task-checkbox'>\n                                <span style='display:flex; flex-direction: row; justify-content: space-between; width: 100%;'>\n                                    <span>${t.title}</span>\n                                    <span>${t.dueDate}</span>\n                                </span>`,e.appendChild(n)})),document.querySelector("#main-content > div.separator").style.display="flex",m(),w(),L()},w=()=>{let t=document.querySelectorAll("#task-btn > input");for(let e=0;e<t.length;e++)t[e].addEventListener("click",(()=>{let t=s.getTaskList()[e];s.removeTask(t),E()}))},L=()=>{const t=document.querySelectorAll("#task-btn"),e=(document.getElementById("details-window"),document.getElementById("title-detail-window")),n=document.getElementById("due-date-detail-window"),d=document.getElementById("description-detail-window");for(let l=0;l<t.length;l++)t[l].addEventListener("click",(()=>{h();let t=s.getTaskList()[l];e.innerText=`'${t.title}'`,n.innerText=`${t.dueDate}`,d.innerText=`'${t.description}'`}))},h=()=>{document.getElementById("details-window").style.display="flex"},B=()=>{document.getElementById("details-window").style.display="none"},I=()=>{document.getElementById("btn-description-close").addEventListener("click",(()=>{B()}))};return{startTodoList:()=>{const s=new e("Project 1"),o=new t("task 1","elo","2023-07-29",!1);s.addTask(o);const c=new t("task 2","sienaaaaww","2023-08-05",!1);s.addTask(c),n.addProject(s),d(),l(),g(),p(),I()}}})().startTodoList()})();