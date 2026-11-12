let taskData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo , progress , done];
let draggedElement = null;

if(localStorage.getItem("tasks")){

    const data = JSON.parse(localStorage.getItem("tasks"));
    for(const col in data){
       const column = document.querySelector(`#${col}`);
       data[col].forEach(task => {
         addTask(task.tittle , task.des , column);
       })
    }
      updateTaskCount();
    
  
}

const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("drag" , (e) => {
        draggedElement = task; 
    })
})

function addTask(tittle , des , column){
     const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable" , "true");

    div.innerHTML = `
      <h2>${tittle}</h2>
      <p>${des}</p>
      <button>Delete</button>
    `
    column.appendChild(div);

    div.addEventListener("drag" , (e) => {
          draggedElement = div;
    })

    const deleteBtn = div.querySelector("button");
    deleteBtn.addEventListener("click" , () => {
        div.remove();
        updateTaskCount();
    })

    return div;
}

function updateTaskCount(){
    [todo , progress , done].forEach(col => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    taskData[col.id] = Array.from(tasks).map(t => {
       return {
        tittle: t.querySelector("h2").innerText,
        des : t.querySelector("p").innerText
       }
    })

   localStorage.setItem("tasks" , JSON.stringify(taskData));

    count.innerText = tasks.length;
  })
}

function dragEventOnColumn(column){

   column.addEventListener("dragenter" , (e) => {
    e.preventDefault();
    column.classList.add("hover-over");

})

column.addEventListener("dragleave" , (e) => {
    e.preventDefault();
   column.classList.remove("hover-over");
}) 

column.addEventListener("dragover" , (e) => {
    e.preventDefault();
})

column.addEventListener("drop" , (e) => {
    e.preventDefault();

    column.appendChild(draggedElement);
    column.classList.remove("hover-over");

    updateTaskCount();

})

}

dragEventOnColumn(todo);
dragEventOnColumn(progress);
dragEventOnColumn(done);

const togglebtn = document.querySelector("#toggle");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task")

togglebtn.addEventListener("click" , () => {
    modal.classList.toggle("active");
})

modalBg.addEventListener("click" , () => {
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click" , () => {

    const taskTittle = document.querySelector("#tasktittle").value
    const taskDes = document.querySelector("#taskdes").value

    addTask(taskTittle , taskDes , todo);
     updateTaskCount();
    modal.classList.remove("active");

     document.querySelector("#tasktittle").value = "";
     document.querySelector("#taskdes").value = "";
})
