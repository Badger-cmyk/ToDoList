import { createToDo } from "./todo.js";
import { createProject } from "./project.js";
import { addProject, deleteProject, addToDo, deleteToDo, editProject, editTodo, toggleComplete, getProjects } from "./controller.js";

export function renderProjects(){
    const projectsContainer = document.querySelector('#project-lists')
    const projects = getProjects()

    projectsContainer.replaceChildren()

    projects.forEach(project => {
        const projectContainer = document.createElement('div')
        projectContainer.classList.add('project')
        projectContainer.dataset.id = project.id

        const first = document.createElement('div')
        const svgFolderContainer = document.createElement('div')
        svgFolderContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height=20 width=20 viewBox="0 0 24 24"><title>folder</title><path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" /></svg>`
        svgFolderContainer.classList.add('svg-container')

        const projectName = document.createElement('p')
        projectName.textContent = `${project.name}`

        const svgTrashContainer = document.createElement('div')
        svgTrashContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height=20 width=20 viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`
        svgTrashContainer.classList.add('svg-container', 'bin')


        const svgEditContainer = document.createElement('div')
        svgEditContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height=20 width=20 viewBox="0 0 24 24"><title>folder-edit-outline</title><path d="M4 18H12.13L11 19.13V20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V10.15C21.74 10.06 21.46 10 21.17 10C20.75 10 20.36 10.11 20 10.3V8H4V18M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96Z" /></svg>`
        svgEditContainer.classList.add('svg-container', 'edit')

        first.append(svgFolderContainer, projectName)
        projectContainer.append(first, svgTrashContainer, svgEditContainer)
        projectsContainer.append(projectContainer)
    });
}