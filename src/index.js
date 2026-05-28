import "./styles.css"
import { renderProjects, initEventListeners, renderTodos } from "./display.js"
import { createProject } from "./project.js"
import { addProject, addToDo, loadProjects } from "./controller.js"
import { createToDo } from "./todo.js"
import { saveToStorage, loadFromStorage } from "./storage.js"

const savedProjects = loadFromStorage()

if(savedProjects){
    loadProjects(savedProjects)
}
else {
    const defaultProject = createProject('Default')
    addProject(defaultProject)
}

renderProjects()
initEventListeners()