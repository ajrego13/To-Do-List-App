const submitBtnEl = document.getElementById('submit-btn'); 
const todoInputEl = document.getElementById('input-field'); 
const todoCont = document.getElementById('todoEl')

submitBtnEl.addEventListener('click', addTodo)
todoCont.addEventListener('click', deleteTodo) // used for delete-btn && complete-btn B/c both parent element


// when page loads || refreshes, it will pull the data from local storage
document.addEventListener('DOMContentLoaded', getTodos)
function getTodos () {
    let todos 
    localStorage.getItem('todos') === null ? todos = [] : todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach((todo) => {
        let newDiv = document.createElement('div')
        newDiv.innerHTML = `<li>${todo}</li> <button class='complete-btn' id='complete'> <button class='delete-btn' id='delete' > </button>`
        todoCont.append(newDiv);
        }
    );
}

//function to create a new dynamic element for each new item && adds it to local storage
function addTodo (e) {
   e.preventDefault(); //prevents refresh
   data = todoInputEl.value 
   if (data === '') {
    alert('you have to fill out the form to add to your list!!!')
   } else {
    let newDiv = document.createElement('div')
    newDiv.innerHTML = `<li>${data}</li> <button class='complete-btn' id='complete'> </button>    <button class='delete-btn' id='delete' > </button>`
    todoCont.append(newDiv); 
    addLS(data); 
    todoInputEl.value = ''  //clears input field after submit
   }
    
}

function addLS (data)  {
    let todo 
    localStorage.getItem('todos') === null ? todo = [] : todo = JSON.parse(localStorage.getItem('todos')); // if LS arry = null, todo = [], otherwise todo = LSarry
    todo.push(data)
   return localStorage.setItem('todos', JSON.stringify(todo)); 
}

// function to delete the todo
function deleteTodo (e) {
    const item = e.target 

    if (item.classList[0] === 'delete-btn') {
        todo = item.parentElement
        todo.remove(); // removes the element from DOM
        deleteLS(todo) // removes element from local storage
    }

   if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement; // div that belongs to the complete-btn you pressed
    todo.classList.toggle('completed') // div class='complete' the li inherets the text-decoration property
   }

}

// todo data getting transfered is the dynamically generated div which is the parent element of the delete btn
function deleteLS(todo) {
    let todos //["lois", "audrey", "charlie"]
    localStorage.getItem('todos') === null ? todos = [] : todos = JSON.parse(localStorage.getItem('todos')); 
    const indexTodo = todo.children[0].innerText // 'charlie' 
   // todos.indexOf(indexTodo) //  2
    todos.splice(todos.indexOf(indexTodo), 1) // removing that index from the array ["lois", "audrey"]
    localStorage.setItem('todos', JSON.stringify(todos)) // sending tha array back to local storage
}
