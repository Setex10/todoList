import {Todo} from './todo.class';
export class TodoList {

    constructor(){

        this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        for(const todo of this.todos){
                
                if(todo.id == id){
                    this.todos.splice(this.todos.indexOf(todo), 1);
                    break;
                }
        }

        this.guardarLocalStorage();
    }

    marcarCompletado( id ){

        for(const todo of this.todos){
                
                if(todo.id == id){
                    todo.completado = !todo.completado;
                    break;
                }
        }

        this.guardarLocalStorage();

    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todos => !todos.completado);
        console.log(this.todos);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));

    };

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo')) 
        ? JSON.parse(localStorage.getItem('todo')) 
        : [];


        this.todos.map((obj) => {
            Todo.fromJson(obj);
        })

    };
}