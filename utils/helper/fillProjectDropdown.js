import projectModule from "../../modules/projectModule.js";

const fillProjectDropdown = () => {
    const select = document.querySelector('#todoProjectId');
    select.innerHTML = '';  // Dropdown leeren, um doppelte Einträge zu vermeiden
    const projects = projectModule.getProjects();

    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.title;
        select.appendChild(option);
    });
};

export default fillProjectDropdown;