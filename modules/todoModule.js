import { v4 as uuidv4 } from 'uuid';
/**
 * todoModules - A module for managing todo items.
 *
 * @module todoModules
 */
const todoModules = (() => {
    const STORAGE_KEY = 'todoApp.todo';

    let todoList = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    /**
     * Saves the todoList to the local storage using the provided key.
     *
     * @function saveToLocalStorage
     * @returns {void}
     */
    const saveToLocalStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
    };

    const addTodo = (title, description, dueDate, priority, projectId) => {
        const todo = {
            id: uuidv4(),
            title,
            description,
            dueDate,
            priority,
            projectId,
            status: 'todo'
        };
        todoList.push(todo);
        saveToLocalStorage();

        return todo;
    };

    const getTodos = (id) => {
        return todoList.filter(todo => todo.projectId === id);
    };

    const getTodo = (id) => {
        return todoList.find(todo => todo.id === id)
    }

    const updateTodoStatus = (id, newStatus) => {
        const index = todoList.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todoList[index].status = newStatus;
            saveToLocalStorage();
        } else {
            throw new Error ('Todo not found');
        }
    }

    const deleteTodo = (id) => {
        const index = todoList.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todoList.splice(index, 1);
            saveToLocalStorage();
        }
    };

    return {
        addTodo,
        getTodos,
        getTodo,
        updateTodoStatus,
        deleteTodo,
    };
})();

export default todoModules;