   const inputSubmit = document.querySelector('.todo-input-submit');
   const todoInTitle = document.querySelector('.todo-input-title');
   const todoInDetail = document.querySelector('.todo-input-detail');
   const todoOngo = document.querySelector('.todo-ongo');
   const todoOngoList = document.querySelector('.todo-ongo-list');
   const todoCompleteList = document.querySelector('.todo-complete-list');
   let current_datetime = new Date();
   let ongoArray = [];
   let completeArray = [];

//event listeners ---------------------------------------------------------------------------------------------------------------------------------------------------------------
   inputSubmit.addEventListener('click',addInput);
   todoOngoList.addEventListener('click',ongoBtnContainer);
   todoCompleteList.addEventListener('click',ongoBtnContainer);
   document.addEventListener('DOMContentLoaded', showLocal);
 
//change bg-color ---------------------------------------------------------------------------------------------------------------------------------------------------------------
    function bodyBgGreen(){
        document.body.style.backgroundColor = inputSubmit.style.backgroundColor = "rgb(75, 191, 107)";  
    }
    function bodyBgBlue(){
        document.body.style.backgroundColor = inputSubmit.style.backgroundColor = "lightblue";
    }
    function bodyBgPink(){
        document.body.style.backgroundColor = inputSubmit.style.backgroundColor = "pink";
    }
    function bodyBgTeal(){
        document.body.style.backgroundColor = inputSubmit.style.backgroundColor = "teal";
    }
    function bodyBgDark(){
        document.body.style.backgroundColor = inputSubmit.style.backgroundColor = "gray";
    }

//add user Input ---------------------------------------------------------------------------------------------------------------------------------------------------------------
    function addInput(e){
        e.preventDefault();
    
        let ongoArrayObject = {
            title: todoInTitle.value,
            detail: todoInDetail.value,
            date: Date()
        }
    
        if(todoInTitle.value !== ''){
            addLocal(ongoArrayObject);
            createTodo(ongoArrayObject);
        }else{
            alert("Title can not be empty ..")
        }
        document.forms[0].reset();  //用来清空form里的input
    }

    function createTodo(object){
    
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div-box')

//btn - todo title --------------------------------------------------------------------------
        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo-title');
        todoTitle.innerHTML = object.title;
        todoDiv.appendChild(todoTitle)

//system time -----------------------------------------------------------------------------------
        const systemTime = document.createElement('div');
        systemTime.classList.add('system-time');
        let current_datetime = new Date(object.date);
        let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        systemTime.innerHTML = formatted_date;
        todoDiv.appendChild(systemTime);

//btn - todo detail --------------------------------------------------------------------------
        const todoDetail = document.createElement('div')
        todoDetail.classList.add('todo-detail');
        todoDetail.classList.add('todo-detail-display-none');
        todoDetail.innerHTML = object.detail;
        todoDiv.appendChild(todoDetail);

        createTodoBtnContainer(todoDiv);

        todoOngoList.appendChild(todoDiv);
    }

    function completeTodo(itemGrandParent){

            const completeDiv = document.createElement('div');
            completeDiv.classList.add('todo-div-box')

            const completeTitle = document.createElement('div');
            completeTitle.classList.add('todo-title');
            completeTitle.innerHTML = itemGrandParent.childNodes[0].innerHTML;
            completeDiv.appendChild(completeTitle)

            const systemTime = document.createElement('div');
            systemTime.classList.add('system-time');
            systemTime.innerHTML = itemGrandParent.childNodes[1].innerHTML;
            completeDiv.appendChild(systemTime);

            const completeDetail = document.createElement('div')
            completeDetail.classList.add('todo-detail');
            completeDetail.classList.add('todo-detail-display-none');
            completeDetail.innerHTML = itemGrandParent.childNodes[2].innerHTML;
            completeDiv.appendChild(completeDetail);

            createCompleteBtnContainer(completeDiv);
            todoCompleteList.appendChild(completeDiv);
        
    }

    function removeLocal(itemGrandParent){
        var ongoLocal = JSON.parse(localStorage.getItem('ongoTodoArray'));

        for(var i=0; i<ongoLocal.length; i++){
            if(itemGrandParent.childNodes[0].innerHTML == ongoLocal[i].title && itemGrandParent.childNodes[2].innerHTML == ongoLocal[i].detail){
                ongoLocal.splice(i, 1);   //删除选定的object of the array
                localStorage.setItem('ongoTodoArray',JSON.stringify(ongoLocal)); //删除后重新设定localstorage
            }
        }
    }

    function removeCompleteLocal(itemGrandParent){
        var completeLocal = JSON.parse(localStorage.getItem('completeTodoArray'));

        for(var i=0; i<completeLocal.length; i++){
            if(itemGrandParent.childNodes[0].innerHTML == completeLocal[i].title && itemGrandParent.childNodes[2].innerHTML == completeLocal[i].detail){
                completeLocal.splice(i, 1);   //删除选定的object of the array
                localStorage.setItem('completeTodoArray',JSON.stringify(completeLocal)); //删除后重新设定localstorage
            }
        }
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


    function completeLocal(completeArrayObject){
        let completeArray;
    
        //必须有这段if。。。，TMD不然localstorage会变成新的array，从而取代掉旧的localstorage array ！！！！！！！！！！！！
        if(localStorage.getItem('completeTodoArray') === null){
            completeArray = []; 
        }else{
            completeArray = JSON.parse(localStorage.getItem('completeTodoArray'));
        }
    
        //add todo to local storage
        completeArray.push(completeArrayObject);
        localStorage.setItem('completeTodoArray',JSON.stringify(completeArray));
    }

    
    function showLocal(){
        var ongoLocalShow = JSON.parse(localStorage.getItem('ongoTodoArray'));
        for(var i=0; i<ongoLocalShow.length; i++){        //用i<length就好。。不需要i<=length。。天啊，debug了好久，原来是这里傻逼了
            createTodo(ongoLocalShow[i])
        }

        var completeLocalShow = JSON.parse(localStorage.getItem('completeTodoArray'));
        for(var i=0; i<completeLocalShow.length; i++){        //用i<length就好。。不需要i<=length。。天啊，debug了好久，原来是这里傻逼了

            const completeDiv = document.createElement('div');
            completeDiv.classList.add('todo-div-box')

            const completeTitle = document.createElement('div');
            completeTitle.classList.add('todo-title');
            completeTitle.innerHTML = completeLocalShow[i].title;
            completeDiv.appendChild(completeTitle)

            const systemTime = document.createElement('div');
            systemTime.classList.add('system-time');
            systemTime.innerHTML = completeLocalShow[i].date;
            completeDiv.appendChild(systemTime);

            const completeDetail = document.createElement('div')
            completeDetail.classList.add('todo-detail');
            completeDetail.classList.add('todo-detail-display-none');
            completeDetail.innerHTML = completeLocalShow[i].detail;
            completeDiv.appendChild(completeDetail);

            createCompleteBtnContainer(completeDiv);
            todoCompleteList.appendChild(completeDiv);
        }
    }

    function createTodoBtnContainer(div){
        const todoBtnContainer = document.createElement('div')
        todoBtnContainer.classList.add('todo-btn-container');
        div.appendChild(todoBtnContainer);

        const todoBtnDetail = document.createElement('button');
        todoBtnDetail.classList.add('todo-btn-detail','todo-btn');
        todoBtnDetail.innerText = "Details  ▼";
        todoBtnContainer.appendChild(todoBtnDetail);

        const todoBtnComplete = document.createElement('button');
        todoBtnComplete.classList.add('todo-btn-complete','todo-btn');
        todoBtnComplete.innerText = "Completed";
        todoBtnContainer.appendChild(todoBtnComplete);

        const todoBtnRemove = document.createElement('button');
        todoBtnRemove.classList.add('todo-btn-remove','todo-btn');
        todoBtnRemove.innerText = "Remove";
        todoBtnContainer.appendChild(todoBtnRemove);
    }

    function createCompleteBtnContainer(div){
        const todoBtnContainer = document.createElement('div')
        todoBtnContainer.classList.add('todo-btn-container');
        div.appendChild(todoBtnContainer);

        const todoBtnDetail = document.createElement('button');
        todoBtnDetail.classList.add('todo-btn-detail','todo-btn');
        todoBtnDetail.innerText = "Details  ▼";
        todoBtnContainer.appendChild(todoBtnDetail);

        const todoBtnClear = document.createElement('button');
        todoBtnClear.classList.add('todo-btn-clear','todo-btn');
        todoBtnClear.innerText = "Clear";
        todoBtnContainer.appendChild(todoBtnClear);
    }
   
    function ongoBtnContainer(e){
        const item = e.target;
        const itemParent = item.parentElement;
        const itemGrandParent = itemParent.parentElement;

        if(item.classList[0] === 'todo-btn-detail'){
            const ongoDetail = itemGrandParent.childNodes[2];  
            if(ongoDetail.classList.contains('todo-detail-display-active')){
                ongoDetail.classList.remove('todo-detail-display-active');
                item.innerText = "Details  ▼";
            }else{
                ongoDetail.classList.toggle('todo-detail-display-active');
                item.innerHTML = 'Details  ▲';
            }
        }

        if(item.classList[0] === 'todo-btn-remove'){  
            itemGrandParent.style.display = 'none';
            removeLocal(itemGrandParent);
        }

        if(item.classList[0] === 'todo-btn-clear'){          
            itemGrandParent.style.display = 'none';
            removeCompleteLocal(itemGrandParent);
        }

        if(item.classList[0] === 'todo-btn-complete'){      
            itemGrandParent.style.display = 'none';
            removeLocal(itemGrandParent);
            let completeArrayObject = {
                title: itemGrandParent.childNodes[0].innerHTML,
                detail: itemGrandParent.childNodes[2].innerHTML,
                date: itemGrandParent.childNodes[1].innerHTML
            }
            completeLocal(completeArrayObject);
            completeTodo(itemGrandParent)
        }
        
    }