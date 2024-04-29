import todoModules from "../modules/todoModule.js";
import projectModule from "../modules/projectModule.js";
import fillProjectDropdown from "./helper/fillProjectDropdown.js";
import showTodos from "./showToDos.js";

const createTodo = (document) => {
    const newTodoButton = document.querySelector(".newTodoButton");
    const modal = document.querySelector("#newTodoModal");
    const closeModal = document.querySelector(".closeTodoModal");
    const form = document.querySelector("#newTodoForm");

    // Open the modal to create a new todo
    newTodoButton.addEventListener("click", () => {
        fillProjectDropdown();
        modal.style.display = "block";
        clearForm(); // Optional: clear the form each time the modal is opened
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateForm()) return; // Validate form inputs before proceeding

        // Get form data
        const title = document.querySelector("#todoTitle").value.trim();
        const description = document.querySelector("#todoDescription").value.trim();
        const dueDate = document.querySelector("#todoDueDate").value;
        const priority = document.querySelector("#todoPriority").value;
        const projectId = document.querySelector("#todoProjectId").value;

        // Add todo through todoModules
        const newTodo = todoModules.addTodo(
            title, description, dueDate, priority, projectId
        );
        projectModule.addTodoToProject(projectId, newTodo.id);

        modal.style.display = "none"; // Close the modal after submission
        clearForm(); // Clear the form fields
        showTodos(projectId, document);
    });

    // Close modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Clear form fields
    function clearForm() {
        form.reset(); // Resets the form values to their initial state
    }

    // Validate form data
    function validateForm() {
        const title = document.querySelector("#todoTitle").value.trim();
        const dueDate = document.querySelector("#todoDueDate").value;
        // Example validation: ensure the title and due date are not empty
        if (!title || !dueDate) {
            alert("Title and Due Date are required.");
            return false;
        }
        return true;
    }

}

export default createTodo;
