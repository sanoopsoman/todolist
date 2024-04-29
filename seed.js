import projectModule from "./modules/projectModule.js";
import todoModule from "./modules/todoModule.js";

export function seedProjects() {
    const projects = [
        { title: 'Develop fancy App' },
        { title: 'Make food' }
    ];

    projects.forEach((project, index) => {
        const createdProject = projectModule.addProject(project.title);
        if (index === 0) {
            seedTodos(createdProject.id, ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4']);
        } else if (index === 1) {
            seedTodos(createdProject.id, ['Todo 5', 'Todo 6']);
        }
    });
}

function seedTodos(projectId, todoTitles) {
    todoTitles.forEach((title, index) => {
        // Assign different statuses based on index for demonstration
        let status = 'todo';
        if (index === 1) status = 'ongoing';
        else if (index === 2) status = 'done';

        const createdTodo = todoModule.addTodo(
            title,
            `Test description for ${title}`,
            `2022-01-0${index + 1}`,
            'High',
            projectId,
            status  // Add the status here
        );

        // Now, add the todo ID to the project
        projectModule.addTodoToProject(projectId, createdTodo.id);
    });
}
