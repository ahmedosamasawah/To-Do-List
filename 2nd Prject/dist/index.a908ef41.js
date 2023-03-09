"use strict";const addBtn=document.querySelectorAll(".btn"),taskContainers=document.querySelectorAll(".tasks__container"),Render=function(e,t=!0){const a=`\n  <li data-id = "${e.id}" class="${e.state}-el to__do-el" draggable="true">\n   <form action="" id="form">\n     <input\n         value="${e.title}"\n         placeholder="What Did You Planned?"\n         type="text"\n         class= "${e.state}-input"\n         ${t?"disabled":""}\n        />\n     <div class="el__tools">\n        <i\n         class="fa fa-pencil edit__btn el__tool"\n         id = "os"\n         aria-hidden="true"\n       ></i>\n       <i\n         class="fa fa-trash remove__btn el__tool"\n         aria-hidden="true"\n       ></i>\n      </div>\n    </form>\n  </li>\n  `;taskContainers.forEach((t=>{t.classList.contains(`${e.state}-elements`)&&t.insertAdjacentHTML("afterbegin",a)}))},generateMarkupAndRender=function(e,t=!1){const a=`\n  <li class="${e.dataset.section}-el to__do-el" draggable="true">\n   <form action="" id="form">\n     <input\n         value=""\n         placeholder="What Did You Planned?"\n         type="text"\n         class= "${e.dataset.section}-input"\n         ${t?"disabled":""}\n         data-id = "${Date.now()}"\n        />\n     <div class="el__tools">\n        <i\n         class="fa fa-pencil edit__btn el__tool"\n         aria-hidden="true"\n       ></i>\n       <i\n         class="fa fa-trash remove__btn el__tool"\n         aria-hidden="true"\n       ></i>\n      </div>\n    </form>\n  </li>\n  `;taskContainers.forEach((t=>{t.classList.contains(`${e.dataset.section}-elements`)&&t.insertAdjacentHTML("afterbegin",a)}))};let arrOfTasks=[];function addElementToArray(e,t){const a={element:e,id:e.dataset.id,title:e.value,state:t.dataset.section};arrOfTasks.push(a),addDataToLocalStorageFrom(arrOfTasks)}localStorage.getItem("tasks")&&(arrOfTasks=JSON.parse(localStorage.getItem("tasks"))),getDataFromLocalStorage(),addBtn.forEach((e=>e.addEventListener("click",(function(e){const t=e.target.closest(".btn");generateMarkupAndRender(t);const a=document.querySelector(`.${t.parentElement.firstElementChild.firstElementChild.firstElementChild.classList[0]}`);a.focus(),a.nextElementSibling.firstElementChild.addEventListener("click",(e=>{e.target.classList.contains("edit__btn")&&(a.removeAttribute("disabled"),a.focus())})),a.nextElementSibling.firstElementChild.nextElementSibling.addEventListener("click",(e=>{if(e.target.classList.contains("remove__btn")){confirm(`Are you sure you want to delete ${a.value}?`)&&(a.parentElement.remove(),deleteTaskWith(a.dataset.id))}})),a.parentElement.addEventListener("submit",(e=>{e.preventDefault(),arrOfTasks.forEach((e=>e.id===a.dataset.id&&e.title!==a.value?[deleteTaskWith(e.id),addDataToLocalStorageFrom(arrOfTasks)]:"")),""!==a.value?(a.setAttribute("disabled",""),addElementToArray(a,t)):alert("Please Fill Out Your Task . . .")}));const r=e=>{e.target.classList.add("hold"),draggedItem=e.target,e.dataTransfer.setData("text/plain",draggedItem.firstElementChild.firstElementChild.dataset.id),e.dataTransfer.effectAlowed="move",setTimeout((()=>e.target.classList="invisible"),0)};document.querySelectorAll(".to__do-el").forEach((e=>{e.addEventListener("dragstart",r),e.addEventListener("dragend",dragEnd)})),taskContainers.forEach((e=>{e.addEventListener("dragover",dragOver),e.addEventListener("dragenter",dragEnter),e.addEventListener("dragleave",dragLeave),e.addEventListener("drop",dragDrop)}))}))));const addDataToLocalStorageFrom=e=>window.localStorage.setItem("tasks",JSON.stringify(e)),removeBtn=document.querySelectorAll(".remove__btn"),editBtn=document.querySelectorAll(".edit__btn"),forms=document.querySelectorAll("form");function getDataFromLocalStorage(){let e=JSON.parse(localStorage.getItem("tasks"));e&&e.forEach((e=>Render(e)))}editBtn.forEach((e=>e.addEventListener("click",(e=>{if(e.target.classList.contains("edit__btn")){const t=e.target.parentElement.previousElementSibling;t.removeAttribute("disabled"),t.focus()}})))),removeBtn.forEach((e=>e.addEventListener("click",(e=>{const t=e.target.parentElement.previousElementSibling;if(e.target.classList.contains("remove__btn")){confirm(`Are you sure you want to delete ${t.value}?`)&&(deleteTaskWith(e.target.parentElement.parentElement.parentElement.dataset.id),t.parentElement.remove())}})))),forms.forEach((e=>e.addEventListener("submit",(e=>{e.preventDefault();const t=e.target.firstElementChild;arrOfTasks.forEach((e=>e.id===t.closest("li").dataset.id&&e.title!==t.value?[e.title=t.value,addDataToLocalStorageFrom(arrOfTasks)]:"")),""!==t.value?(t.setAttribute("disabled",""),addElementToArray(t,e.target)):alert("Please Fill Out Your Task . . .")}))));const deleteTaskWith=e=>{arrOfTasks=arrOfTasks.filter((t=>t.id!=e)),addDataToLocalStorageFrom(arrOfTasks)};let draggedItem=null;const dragStart=e=>{e.target.classList.add("hold"),draggedItem=e.target,e.dataTransfer.setData("text/plain",draggedItem.dataset.id),e.dataTransfer.effectAlowed="move",setTimeout((()=>e.target.classList="invisible"),0)},dragEnd=e=>{draggedItem=null,e.target.classList="to__do-el"},dragOver=e=>{"text/plain"===e.dataTransfer.types[0]&&e.preventDefault()},dragEnter=e=>{"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),e.target.closest("ul").classList.add("droppable"))},dragLeave=e=>{e.relatedTarget.closest("ul")||e.target.closest("ul").classList.remove("droppable")},dragDrop=e=>{const t=e.dataTransfer.getData("text/plain"),a=e.target.closest("ul"),r=Array.from(a.children);if(r.pop(),r.find((e=>e.dataset.id===t)))return;e.preventDefault(),a.classList.remove("droppable"),a.prepend(draggedItem);const n=a.firstElementChild,s=a.classList[0].substring(0,a.classList[0].length-9);n.classList.add(`${s}-el`),n.firstElementChild.firstElementChild.classList=`${s}-input`,arrOfTasks.forEach((e=>e.id===t&&[e.state=s,addDataToLocalStorageFrom(arrOfTasks)]))},toDoItems=document.querySelectorAll(".to__do-el");toDoItems.forEach((e=>{e.addEventListener("dragstart",dragStart),e.addEventListener("dragend",dragEnd)})),taskContainers.forEach((e=>{e.addEventListener("dragover",dragOver),e.addEventListener("dragenter",dragEnter),e.addEventListener("dragleave",dragLeave),e.addEventListener("drop",dragDrop)}));
//# sourceMappingURL=index.a908ef41.js.map
