import { seedProjects } from "./seed.js";
import projectModule from "./modules/projectModule.js";
import todoModule from "./modules/todoModule.js";
import showProjects from "./utils/showProjects.js";
import showTodos from "./utils/showToDos.js";
import createProject from "./utils/createProject.js";
import createTodo from "./utils/createTodo.js";
import initializeDragAndDrop from "./utils/initializeDragAndDrop.js";




document.addEventListener('DOMContentLoaded', () => {
    if (!projectModule.getProjects().length) {
        seedProjects();  // Initial seed, falls keine Projekte vorhanden sind
    }

    showProjects(document);
    createProject(document);
    createTodo(document);
    initializeDragAndDrop();  // Initial call to set up drag & drop for existing elements

    const projectList = document.querySelector('#project-list');
    const projects = projectModule.getProjects();

    // Automatisch das erste Projekt laden, wenn es Projekte gibt
    if (projects.length > 0) {
        const firstProjectId = projects[0].id;
        showTodos(firstProjectId, document);
        const firstProjectElement = projectList.querySelector(`[data-project-id="${firstProjectId}"]`);
        if (firstProjectElement) {
            firstProjectElement.classList.add('active');
            document.querySelector("#selectedProject").textContent = firstProjectElement.textContent;
        }
    }

    // Hinzufügen von Click-Events zu jedem Projekt in der Liste, um Todos anzuzeigen und Drag & Drop zu reinitialisieren
    projectList.addEventListener('click', (event) => {
        const target = event.target.closest('[data-project-id]');
        if (target && target.dataset.projectId) {
            // Entfernen aller 'active'-Klassen und Hinzufügen zur aktuellen Auswahl
            document.querySelectorAll('#project-list li').forEach(li => li.classList.remove('active'));
            target.classList.add('active');

            showTodos(target.dataset.projectId, document);
            initializeDragAndDrop();  // Reinitialize drag & drop to ensure new todos are draggable
            document.querySelector("#selectedProject").textContent = target.textContent;
        }
    });
});
