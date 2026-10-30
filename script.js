const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let draggedElement = null;

const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("drag" , (e) => {
        draggedElement = task; 
    })
})

// progress.addEventListener("dragen
//ter" , (e) => {
//     progress.classList.add("hover-over");

// })

// progress.addEventListener("dragleave" , (e) => {
//    progress.classList.remove("hover-over");
// })

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
})
}

dragEventOnColumn(todo);
dragEventOnColumn(progress);
dragEventOnColumn(done);

const togglebtn = document.querySelector("#toggle");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");

togglebtn.addEventListener("click" , () => {
    modal.classList.toggle("active");
})

modalBg.addEventListener("click" , () => {
    modal.classList.remove("active");
})
