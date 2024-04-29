import todoModule from "../modules/todoModule.js";
import projectModule from "../modules/projectModule.js";
import clearTodos from "./helper/clearTodos.js";
import assignPriorityColor from "./helper/assignPriorityColor.js";


const showTodos = (projectId, document) => {
    // Clear existing todos before displaying new ones
    clearTodos(document);

    const projectTodos = projectModule.getTodos(projectId);
    projectTodos.forEach(todoId => {
        const todo = todoModule.getTodo(todoId);
        const todoCard = document.createElement("div");
        todoCard.classList.add("toDoCard", 'draggable');
        todoCard.setAttribute("draggable", "true");
        todoCard.dataset.todoId = todo.id;

        // Use createElement and textContent instead of innerHTML
        const title = document.createElement("h3");
        title.classList.add("todoTitle");
        title.textContent = todo.title;

        const description = document.createElement("p");
        description.textContent = todo.description;

        const dueDate = document.createElement("p");
        dueDate.textContent = `Due: ${todo.dueDate}`;

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${todo.priority}`;
        assignPriorityColor(priority, todo.priority)

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("deleteTodo");
        deleteButton.addEventListener("click", () => {
            todoModule.deleteTodo(todo.id);
            showTodos(projectId, document);
        });

        // Append all child elements to todoCard
        todoCard.append(deleteButton, title, description, dueDate, priority);


        // Find the container based on the status and append the todoCard
        const container = document.getElementById(`${todo.status}-tasks`);
        if (container) {
            container.appendChild(todoCard);
        } else {
            console.warn("Container not found for status:", todo.status);
        }
    })
}

export default showTodos;
