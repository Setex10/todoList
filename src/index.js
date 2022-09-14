//Estilos
import './styles.css';

//Clases
import {Todo, TodoList} from './js/class/index';
import { crearTodoHtml } from './js/componentes';

const todoList = new TodoList();


todoList.todos.forEach( crearTodoHtml );


