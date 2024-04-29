import { describe, it, expect, beforeEach } from 'vitest';
import todoModule from '../modules/todoModule';
import projectModule from '../modules/projectModule';

describe('Integration between todoModule and projectModule', () => {
    beforeEach(() => {
        // Clear all entries before each test
        localStorage.clear();
        // Reset modules if necessary, depending on how they are implemented
    });

    it('should allow adding todos to a project and retrieve them accurately', () => {
        // Step 1: Create a new project
        const newProject = projectModule.addProject('Work Project');
        //const projects = projectModule.getProjects();
        //const projectId = projects[0].id;

        // Step 2: Add todos to the project
        const newTodo = todoModule.addTodo('Finish report', 'Complete the annual report.', '2023-04-15', 'high', 'Include financials', ['Draft', 'Review', 'Finalize'], newProject.id);
        // const todo = todoModule.getTodos()[0];

        // Step 3: Add the todo to the project
        projectModule.addTodoToProject(newProject.id, newTodo.id);

        // Step 4: Check that the todo has been added to the project
        const projectTodos = projectModule.getTodos(newProject.id);
        expect(projectTodos).toHaveLength(1);
        expect(projectTodos[0]).toBe(newTodo.id);

        // Fetch the todo object using the ID from todoModule and check its details
        const todoDetails = todoModule.getTodo(projectTodos[0]); // Assuming this method exists
        expect(todoDetails.title).toBe('Finish report'); // Check the title of the todo

        // Verify full integration
        const projects = projectModule.getProjects();
        expect(projects.find(p => p.id === newProject.id).todos).toContain(newTodo.id);
    });
});
