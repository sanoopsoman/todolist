import { v4 as uuidv4 } from 'uuid'

/**
 * The projectModule is a module that provides functions for managing projects and todos.
 *
 * @namespace projectModule
 */
const projectModule = (() => {
    const STORAGE_KEY = 'projectApp.projects';

    let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const saveToLocalStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }

    const addProject = (title) => {
        const project = {
            id: uuidv4(),
            title: title,
            todos: []
        }

        projects.push(project);
        saveToLocalStorage();

        return project;
    }

    const updateProject = (id, title) => {
        const projectIndex = projects.findIndex(project => project.id === id);
        if (projectIndex !== -1) {
            projects[projectIndex].title = title;
            saveToLocalStorage();
        } else {
            throw new Error("Project not found.");
        }
        return projects[projectIndex];
    }

    const getProjects = () => projects;

    const addTodoToProject = (projectId, todoId) => {
        const projectIndex = projects.findIndex(project => project.id === projectId);
        if (projectIndex !== -1) {
            projects[projectIndex].todos.push(todoId);
            saveToLocalStorage();
        } else {
            throw new Error('Project not found.');
        }
    }


    const getTodos = (projectId) => {
        const project = projects.find(project => project.id === projectId);
        return project ? project.todos : [];
    }

    const deleteProjects = (projectId) => {
        const index = projects.findIndex(project => project.id === projectId);

        if (index !== -1) {
            projects.splice(index, 1);
            saveToLocalStorage();
        } else {
            throw new Error("Project not found.");
        }
    }

    return {
        addProject,
        updateProject,
        getProjects,
        getTodos,
        addTodoToProject,
        deleteProjects
    }
 })()

export default projectModule;