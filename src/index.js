import "./styles.css"
import { renderProjects, initEventListeners, renderTodos } from "./display.js"
import { createProject } from "./project.js"
import { addProject, addToDo } from "./controller.js"
import { createToDo } from "./todo.js"

const defaultProject = createProject('Default')

addProject(defaultProject)

const defaultTodo = createToDo('Study cloud engineering', 'Write a journal API', '2026-05-25', 'high')
addToDo(defaultProject.id, defaultTodo)

renderProjects()
initEventListeners()