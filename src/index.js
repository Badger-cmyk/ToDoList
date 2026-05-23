import "./styles.css"
import { renderProjects, initEventListeners } from "./display.js"
import { createProject } from "./project.js"
import { addProject } from "./controller.js"

const defaultProject = createProject('Default')
const homeProject = createProject('Home')
const schoolProject = createProject('School')



addProject(defaultProject)
addProject(homeProject)
addProject(schoolProject)


renderProjects()
initEventListeners()