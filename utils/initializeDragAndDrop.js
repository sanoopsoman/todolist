import todoModule from "../modules/todoModule.js";

export default function initializeDragAndDrop() {
    const columns = document.querySelectorAll('.kanban-tasks');
    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault(); // Necessary to allow dropping
        });

        document.addEventListener('dragstart', e => {
            if (e.target.classList.contains('draggable')) {
                e.target.classList.add('dragging');
                console.log('Dragging element:', e.target);
            }
        });


        column.addEventListener('drop', e => {
            e.preventDefault();
            console.log('Drop event fired');

            // Use a global selector to ensure you're checking the entire document
            const draggable = document.querySelector('.dragging');
            console.log('Draggable element:', draggable); // Check what this logs

            if (draggable) {
                column.appendChild(draggable);
                draggable.classList.remove('dragging');
                console.log('Dropped into:', column.dataset.status);

                const newStatus = column.dataset.status;
                const todoId = draggable.dataset.todoId;

                // Update the todo's status using the todoModule
                todoModule.updateTodoStatus(todoId, newStatus);
            } else {
                console.error('No draggable element found at drop');
            }
        });
    });
}