
let gorevListesi = [
    {"id": 1, "gorevAdi": "Görev1", "durum":"completed"},
    {"id": 2, "gorevAdi": "Görev2", "durum":"pending"},
];

let editId;
let isEditTask = false;

const taskInput = document.querySelector("#txtName");
const btnClear = document.querySelector("#btnClear");

displayTasks();

function displayTasks(){
   let ul = document.getElementById("task-list");
   ul.innerHTML="";

   if(gorevListesi.length == 0){
    ul.innerHTML = "<p class='p-3 m-0'>Yapılacaklar Listeniz Boş..</p>"
}else{

   for(let gorev of gorevListesi){
      
      let completed = gorev.durum == "completed" ? "checked":"";

      let li = `
        <li class="task list-group-item">
          <div class="form-check">
             <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
             <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
          </div>
          <div class="dropdown">
              <button id="dropdown"class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis"></i>
              </button>
              <ul class="dropdown-menu">
              <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i>  Sil</a></li>
              <li><a onclick='editTask(${gorev.id},"${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-sharp fa-solid fa-pen"></i> Düzenle</a></li>
              </ul>
          </div>
         </li>
      `;

      ul.insertAdjacentHTML("beforeend",li);
    }
  }
}

document.querySelector("#btnNewTask").addEventListener("click",newTask);
document.querySelector("#btnNewTask").addEventListener("keypress",function(){
    if(event.key == "Enter"){
        document.getElementById("#btnNewTask").click();
    }
});

function newTask(event){

    if(taskInput.value==""){
        alert("Lütfen bir görev giriniz..");
    }else{ 
        if(!isEditTask){
            gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": taskInput.value}); //ekleme işlemi
            isEditTask=true;
        }else{
            for(let gorev of gorevListesi){
                if(gorev.id == editId){
                    gorev.gorevAdi = taskInput.value; //düzenleme
                }
                isEditTask = false;
            }
        taskInput.value="";
        displayTasks();
    }

    event.preventDefault();
}
}

function deleteTask(id){

    let deletedId; 

    // // ==>> option method for delete. //
   // for(let index in gorevListesi){
    //     if(gorevListesi[index].id == id){   
    //         deletedId = index;
    //     }
    // }

    // // ==>> option method for delete. //
    // deletedId = gorevListesi.findIndex(function(gorev){    
    //     return gorev.id == id;
    // })
    
    // Arrow function //
    deletedId = gorevListesi.findIndex(gorev => gorev.id == id);

    gorevListesi.splice(deletedId,1);
    displayTasks();
}
   

function editTask(taskId,taskName){
    editId = taskId;
    isEditTask = true;
    taskInput.value = taskName;
    taskInput.focus();
    taskInput.classList.add("active");


    console.log("edit id:",editId);
    console.log("edit mode:",isEditTask);
}

btnClear.addEventListener("click",function(){
    gorevListesi.splice(0,gorevListesi.length);
    displayTasks();
});

function updateStatus(selectedTask){
    let label = selectedTask.nextElementSibling;
    let durum;

    if(selectedTask.checked){
        label.classList.add("checked");
        durum = "compledted";
    }else{
        label.classList.remove("checked");
        durum = "pending";
    }

    for(let gorev of gorevListesi){
        if(gorev.id == selectedTask.id){
            gorev.durum = durum;
        }
    }

    console.log(gorevListesi);
}
