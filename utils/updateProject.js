import handleFormSubmitProject from "./helper/handleFormSubmitProjects.js";

const updateProject = (id, document) => {
    const modal = document.getElementById("newProjectModal");
    const closeModal = document.querySelector(".close");
    const form = document.getElementById("newProjectForm");

    // Modal öffnen
    modal.style.display = "block";

    // Schließen des Modals beim Klicken auf das Schließsymbol
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Schließen des Modals beim Klicken außerhalb des Modalinhalts
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Handler für Formularsubmit
    form.onsubmit = (e) => {
        console.log("Update mode! Project ID: ", id); // Zum Debuggen
        handleFormSubmitProject(e, true, id);
    };

    // Setzen des Titels im Formular, vor dem Anzeigen des Modals
    const currentProjectTitle = getCurrentProjectTitle(id);
    document.getElementById("projectTitle").value = currentProjectTitle;
};

export default updateProject;

function getCurrentProjectTitle(id) {
    // Funktion zum Abrufen des Titels aus dem Projektarray
    const projects = JSON.parse(localStorage.getItem('projectApp.projects')) || [];
    const project = projects.find(project => project.id === id);
    return project ? project.title : '';
}
