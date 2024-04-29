import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initializeDragAndDrop } from '../../main.js'; // Adjust path as needed
import todoModule from '../../modules/todoModule.js'; // Adjust path as needed

// Mock todoModule's updateTodoStatus method
vi.mock('./modules/todoModule', () => ({
    updateTodoStatus: vi.fn()
}));

describe('initializeDragAndDrop', () => {
    beforeEach(() => {
        // Set up our document body
        document.body.innerHTML = `
      <div class="kanban-tasks" id="todo-tasks" data-status="todo"></div>
      <div class="kanban-tasks" id="ongoing-tasks" data-status="ongoing"></div>
      <div class="kanban-tasks" id="done-tasks" data-status="done"></div>
    `;

        // Call the function to set up event listeners
        initializeDragAndDrop();
    });

    it('should move the dragged element to the new column and update its status', () => {
        // Create a draggable element
        const draggable = document.createElement('div');
        draggable.classList.add('draggable');
        draggable.setAttribute('draggable', 'true');
        draggable.dataset.todoId = '123'; // Simulate a todo ID
        document.body.appendChild(draggable); // Add to the DOM

        // Simulate dragging
        draggable.classList.add('dragging');

        // Get the target column and simulate a drop event
        const targetColumn = document.getElementById('ongoing-tasks');
        const dropEvent = new Event('drop', { bubbles: true });
        targetColumn.dispatchEvent(dropEvent);

        // Check if the element was moved to the new column
        expect(targetColumn.contains(draggable)).toBe(true);
        expect(draggable.classList.contains('dragging')).toBe(false);

        // Check if the status update was called correctly
        expect(todoModule.updateTodoStatus).toHaveBeenCalledWith('123', 'ongoing');
    });
});
