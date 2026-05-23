import "./styles.css"
import { renderProjects, initEventListeners } from "./display.js"
import { createProject } from "./project.js"
import { addProject } from "./controller.js"

const defaultProject = createProject('Default')

addProject(defaultProject)

renderProjects()
initEventListeners()