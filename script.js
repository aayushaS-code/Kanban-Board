const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let tasksData = {};
const columns = [todo, progress, done];
let dragElement = null;


function addTask(title,desc, column){
  const div = document.createElement("div");
      div.classList.add("task");
      div.setAttribute("draggable", "true");
      div.innerHTML = `  <h2>${title}</h2>
                    <p>${desc}</p>
                    <button>Delete</button>`;

      div.addEventListener("drag", (e) => {
        dragElement = div;
      });

      column.appendChild(div);

      const dltButton=div.querySelector("button");
      dltButton.addEventListener("click",(e)=>{
        div.remove();
        updateTaskCount();
      })
      return div;
}


function updateTaskCount(){
 columns.forEach((col) => {
      const tasks = col.querySelectorAll(".task");
      const count = col.querySelector(".right");
      
      tasksData[col.id] = Array.from(tasks).map((t) => {
        return {
          title: t.querySelector("h2").innerText,
          desc: t.querySelector("p").innerText,
        };
      });
      
      localStorage.setItem("tasks", JSON.stringify(tasksData));
      count.innerText = tasks.length;
    });
}

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));

  for (const col in data) {
    const column = document.querySelector(`#${col}`);

    data[col].forEach((task) => {
     addTask(task.title,task.desc,column)
    });

    updateTaskCount();
    //  const tasks = column.querySelectorAll(".task");
    //   const count = column.querySelector(".right");
    //   count.innerText=tasks.length;
  }


}

const tasks = document.querySelectorAll(".task");
tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    // console.log("Dragging",e ,task)
    dragElement = task;
  });
});





function addDragElementsOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    // console.log("hsjhdsd")
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });


  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    // console.log("kjkdsd");
  });


  column.addEventListener("drop", (e) => {
    e.preventDefault();
    // console.log("kjksjd",e)
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
    updateTaskCount()
    // columns.forEach((col) => {
    //   const tasks = col.querySelectorAll(".task");
    //   const count = col.querySelector(".right");

    //   count.innerText = tasks.length;
    // });

    // columns.forEach((col) => {
    //   const tasks = col.querySelectorAll(".task");
    //   const count = col.querySelector(".right");

    //   tasksData[col.id] = Array.from(tasks).map((t) => {
    //     return {
    //       title: t.querySelector("h2").innerText,
    //       desc: t.querySelector("p").innerText
    //     };
    //   });

    //   localStorage.setItem("tasks", JSON.stringify(tasksData));

      // console.log(tasksData)

    //   count.innerText = tasks.length;
    // });
  });

}
addDragElementsOnColumn(todo);
addDragElementsOnColumn(progress);
addDragElementsOnColumn(done);
   





  // Modal-Logic
  const toggleModalButton = document.querySelector("#toggle-modal");
  const modalBg = document.querySelector(".modal .bg");
  const modal = document.querySelector(".modal");

  toggleModalButton.addEventListener("click", (e) => {
    modal.classList.toggle("active");
  });

  modalBg.addEventListener("click", (e) => {
    modal.classList.remove("active");
  });

  const addTaskButton = document.querySelector(".modal .add-task-button");
  addTaskButton.addEventListener("click", (e) => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

addTask(taskTitle, taskDesc, todo)

updateTaskCount();
modal.classList.remove("active");

document.querySelector("#task-title-input").value="";
   document.querySelector("#task-desc-input").value="";

    
    
    
    // columns.forEach((col) => {
    //   const tasks = col.querySelectorAll(".task");
    //   const count = col.querySelector(".right");
      
    //   tasksData[col.id] = Array.from(tasks).map((t) => {
    //     return {
    //       title: t.querySelector("h2").innerText,
    //       desc: t.querySelector("p").innerText,
    //     };
    //   });
      
    //   localStorage.setItem("tasks", JSON.stringify(tasksData));
    //   count.innerText = tasks.length;
    // }); 
    

    // div.addEventListener("drag", (e) => {
    //   dragElement = div;
    // });
  });