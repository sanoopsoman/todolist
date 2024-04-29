import projectModule from "../../modules/projectModule.js";
import showProjects from "../showProjects.js";

function handleFormSubmitProject(event, isUpdate = false, projectId = null) {
    event.preventDefault();
    const title = document.getElementById("projectTitle").value.trim();
    console.log("Projekttitel: ", title); // Zum Debuggen
    if (!title) {
        alert('Project title cannot be empty');
        return;
    }

    if (isUpdate && projectId) {
        projectModule.updateProject(projectId, title);
    } else {
        projectModule.addProject(title);
    }

    showProjects(document);
    document.getElementById("newProjectModal").style.display = "none";
    event.target.reset();
}

export default handleFormSubmitProject;