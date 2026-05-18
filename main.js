//code 
const addBtn = document.querySelector(".add");
const input = document.querySelector(".task-input");
const list = document.querySelector(".list");
let arrOfTasks = [];
let i = 1;

window.addEventListener("load" , function(e){
    if(this.localStorage.getItem("tasks")){
        arrOfTasks = JSON.parse(this.localStorage.getItem("tasks"));
        addToBody(arrOfTasks);
    }
})
addBtn.addEventListener("click" , function(e){
    if(input.value != ""){
        let obj = {
            id:i,
            text:input.value,
        }
        arrOfTasks.push(obj);
        addToBody(arrOfTasks);
        addToLocalStorage(arrOfTasks);
        i++;
        input.value = '';
    }
})
function addToBody(arr){
    list.innerHTML = "";
    let j = 0;
    arr.forEach((element) => {
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-index" , j);
        let h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(element.text));
        div.appendChild(h2);
        let delBtn = document.createElement("button");
        delBtn.className = "del";
        delBtn.appendChild(document.createTextNode("Delete"));
        div.appendChild(delBtn);
        list.appendChild(div);
        j++;
    })
}

function addToLocalStorage(arr){
    localStorage.setItem("tasks" , JSON.stringify(arr));
}

list.addEventListener("click" ,function(e){
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        for(let j = 0 ; j < JSON.parse(localStorage.getItem("tasks")).length ; j++){
            let arr =  JSON.parse(localStorage.getItem("tasks"));
            if(j == e.target.parentElement.dataset.index){
                arr.splice(e.target.parentElement.dataset.index , 1);
                addToLocalStorage(arr);
            }
        }
    }
})