const titleIn = document.querySelector('.title-in');
const detailIn = document.querySelector('.detail-in');
const submitIn = document.querySelector('.submit-in');
const todoUl = document.querySelector('.todo-ul');
let ongoArray = [];



//calling functions
submitIn.addEventListener('click', addInput);
document.addEventListener('DOMContentLoaded', showLocal);


function addInput(e){
    e.preventDefault();

    let ongoArrayObject = {
        title: titleIn.value,
        detail: detailIn.value,
        date: Date()
    }

    addLocal(ongoArrayObject);
    createTodo();

    document.forms[0].reset();  //用来清空form里的input
}


//只是新输入的todo，并不包含localstorage里面已经有的
function createTodo() {
        const todoList = document.createElement('div');

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = "Title: " + titleIn.value;
        todoList.appendChild(titleDiv);
    
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = "Detail: " + detailIn.value;
        todoList.appendChild(detailDiv);

        const timeDiv = document.createElement('div');
        timeDiv.innerHTML = "Time: " + Date();
        todoList.appendChild(timeDiv);
    
        todoUl.appendChild(todoList);
}

function addLocal(ongoArrayObject){
    let ongoArray;

    //必须有这段if。。。，TMD不然localstorage会变成新的array，从而取代掉旧的localstorage array ！！！！！！！！！！！！
    if(localStorage.getItem('ongoTodoArray') === null){
        ongoArray = []; 
    }else{
        ongoArray = JSON.parse(localStorage.getItem('ongoTodoArray'));
    }

    //add todo to local storage
    ongoArray.push(ongoArrayObject);
    localStorage.setItem('ongoTodoArray',JSON.stringify(ongoArray));
}


function showLocal(){
    var ongoLocalShow = JSON.parse(localStorage.getItem('ongoTodoArray'));
    console.log(ongoLocalShow);
    for(var i=0; i<ongoLocalShow.length; i++){        //用i<length就好。。不需要i<=length。。天啊，debug了好久，原来是这里傻逼了

        const todoList = document.createElement('div');

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = "Title: " + ongoLocalShow[i].title;
        todoList.appendChild(titleDiv);
    
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = "Detail: " + ongoLocalShow[i].detail;
        todoList.appendChild(detailDiv);

        const timeDiv = document.createElement('div');
        timeDiv.innerHTML = "Time: " + ongoLocalShow[i].date;
        todoList.appendChild(timeDiv);
    
        todoUl.appendChild(todoList);
    }
}