import handleFormSubmitProjects from "./helper/handleFormSubmitProjects.js";

const createProject = document => {
    const newProjectButton = document.querySelector('.newProjectButton');
    const modal = document.getElementById("newProjectModal");
    const closeModal = document.querySelector(".close");
    const form = document.getElementById("newProjectForm");

    // New Project Button
    newProjectButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Modal Close Button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    })

    form.addEventListener("submit", (e) => handleFormSubmitProjects(e));

    // Close modal when clicking outsinde of it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

};

export default createProject;