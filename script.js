const todo=document.querySelector("#todo");
const progress=document.querySelector("#progress");
const done=document.querySelector("#done");

let dragElement=null;

const tasks=document.querySelectorAll(".task");
tasks.forEach((task)=>{
    task.addEventListener("drag",(e)=>{
        // console.log("Dragging",e ,task)
        dragElement=task;
    })
})

function addDragElementsOnColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        // console.log("hsjhdsd")
        column.classList.add("hover-over")
    })

    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
        // console.log("kjkdsd");

    })

    column.addEventListener("drop",(e)=>{
        e.preventDefault();
        // console.log("kjksjd",e)
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

    })


}

addDragElementsOnColumn(todo);
addDragElementsOnColumn(progress);
addDragElementsOnColumn(done);

// Modal-Logic
const toggleModalButton=document.querySelector("#toggle-modal");
const modalBg=document.querySelector(".modal .bg");
const modal=document.querySelector(".modal")

toggleModalButton.addEventListener("click",(e)=>{
    modal.classList.toggle("active");
})

modalBg.addEventListener("click",(e)=>{
    modal.classList.remove("active");
})
