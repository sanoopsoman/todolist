import projectModule from "../modules/projectModule.js";
import updateProject from "./updateProject.js";
import todoModule from "../modules/todoModule.js";

const showProjects = (document) => {
    // get all projects
    const projects = projectModule.getProjects();
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement("li");
        projectElement.textContent = project.title;
        // Set data attribute for identification
        projectElement.dataset.projectId = project.id;
        projectList.appendChild(projectElement);

        // Create Div for buttons
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttonDiv");
        projectElement.appendChild(buttonDiv);

        // Add delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("deleteProject");
        deleteButton.addEventListener("click", () => {
            projectModule.deleteProjects(project.id);
            showProjects(document);
        });
        buttonDiv.appendChild(deleteButton);

        // Update Button
        /*
        const updateButton = document.createElement("button");
        updateButton.textContent = 'Update';
        updateButton.classList.add("updateProject");
        updateButton.addEventListener("click", () => {
            // Call a function to handle the update logic
            updateProject(project.id, document);
        });
        buttonDiv.appendChild(updateButton);

         */
    });
}

export default showProjects;