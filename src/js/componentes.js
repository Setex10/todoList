//Class
import { Todo, TodoList } from './class/index';
const todoList = new TodoList();

//Referencias
const divTodoList = document.querySelector('.todo-list'),
    txtInput = document.querySelector('.new-todo'),
    btnBorrar = document.querySelector('.clear-completed'),
    ulFiltros = document.querySelector('.filters'),
    anchotFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( {tarea, completado, id} ) => {

    const htmlTodo = `
    <li class="${ completado ? 'completed': '' }" data-id="${id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${completado ? 'checked' : ''}>
							<label>${ tarea }</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
    `;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo

    divTodoList.appendChild(div.firstElementChild)

    return div
}

txtInput.addEventListener('keyup', (event) => {

    if(event.keyCode === 13 && txtInput.value.length > 0){
        const tarea = new Todo(txtInput.value);
        const todoList = new TodoList();
        todoList.nuevoTodo( tarea );
        
        crearTodoHtml(tarea)

        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (event) => {
    const nameElement = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');
    
    if(nameElement.includes('button')){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild(todoElement);
    }
    
    if(nameElement.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElement.classList.toggle('completed');
    }

});


btnBorrar.addEventListener('click', () => {
    
    for(let i = divTodoList.children.length - 1; i >= 0; i--){
        const element = divTodoList.children[i];
        if(element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }
    }

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    anchotFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for(const todos of divTodoList.children){

        switch(filtro){
            case 'Pendientes': 
                (todos.classList.contains('completed'))
                ? todos.classList.add('hidden') 
                : todos.classList.remove('hidden');
            break;

            case 'Completados':
                (todos.classList.contains('completed'))
                ? todos.classList.remove('hidden')
                : todos.classList.add('hidden'); 
            break;

            default:
                todos.classList.remove('hidden');
            break;
        }

    }
})