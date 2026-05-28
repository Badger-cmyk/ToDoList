import { createToDo } from "./todo.js";
import { createProject } from "./project.js";
import { addProject, deleteProject, addToDo, deleteToDo, editProject, editTodo, toggleComplete, getProjects } from "./controller.js";
import { format } from 'date-fns';
import { saveToStorage, loadFromStorage } from "./storage.js";

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

        const trashEditContainer = document.createElement('div')
        trashEditContainer.classList.add('trash-edit')

        first.append(svgFolderContainer, projectName)
        trashEditContainer.append(svgTrashContainer, svgEditContainer)
        projectContainer.append(first, trashEditContainer)
        projectsContainer.append(projectContainer)
    });
}

function createTodoCard(todo){
    const todoContainer = document.createElement('div')
    todoContainer.classList.add('todo-container')
    todoContainer.dataset.id = todo.id
    
    const todoTitle = document.createElement('h4')
    todoTitle.textContent = todo.title
    const todoCheck = document.createElement('input')
    todoCheck.type = 'checkbox'

    const todoDes = document.createElement('p')
    todoDes.textContent = todo.description

    const dueDate = document.createElement('p')
    dueDate.textContent = `Due date: ${format(new Date(todo.dueDate), 'dd MMM, yyyy')}`

    const priority = document.createElement('p')
    priority.textContent = `Priority: ${todo.priority}`

    const todoChildOne = document.createElement('div')
    const todoChildTwo = document.createElement('div')
    const childOneSubOne = document.createElement('div')
    childOneSubOne.classList.add('child-one-sub-one')
    const childOneSubTwo = document.createElement('div')
    childOneSubTwo.classList.add('child-one-sub-two')
    const svgTrashContainer = document.createElement('div')
    svgTrashContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height=20 width=20 viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`
    svgTrashContainer.classList.add('svg-container', 'bin')

    childOneSubOne.append(todoCheck, todoTitle)
    childOneSubTwo.append(svgTrashContainer, dueDate, priority)
    todoChildOne.append(childOneSubOne, childOneSubTwo)
    todoChildTwo.append(todoDes)
    todoContainer.append(todoChildOne, todoChildTwo) 

    return todoContainer
}

export function renderTodos(projectId){
    const todosContainer = document.querySelector('.main-area')
    const project = getProjects().find((proj) => proj.id === projectId)

    todosContainer.replaceChildren()

    const addTodoBtn = document.createElement('button')
    addTodoBtn.classList.add('new-todo')
    const spanOne = document.createElement('span')
    spanOne.textContent = `+`
    const spanTwo = document.createElement('span')
    spanTwo.textContent = `Add Todo`
    addTodoBtn.append(spanOne, spanTwo)

    project.todos.forEach((todo) => {
        const todoCard = createTodoCard(todo)
        todosContainer.append(todoCard)
    })

    todosContainer.append(addTodoBtn)
}

export function renderAllTasks() {
    const todosContainer = document.querySelector('.main-area')

    todosContainer.replaceChildren()

    const projects = getProjects()

    if(projects.length === 0) todosContainer.textContent = 'No Tasks To Complete'

    projects.forEach(project => {
        project.todos.forEach(todo => {
            const todoCard = createTodoCard(todo)
            todosContainer.append(todoCard)
        })
    })
}

export function initEventListeners(){
    const projectBtn = document.querySelector('.new-project')
    const modal = document.querySelector('.modal')
    const closeBtn = document.querySelector('.close-btn')
    const projectForm = document.querySelector('#project-form')
    const projectInput = document.querySelector('#project-name')
    const projectList = document.querySelector('#project-lists')
    const editProjectModal = document.querySelector('.edit-project-modal')
    const editProjectInput = document.querySelector('#edit-project-name')
    const editProjectForm = document.querySelector('#edit-project-form')
    const closeEditBtn = document.querySelector('.close-edit-btn')
    const mainArea = document.querySelector('.main-area')
    const addTodoModal = document.querySelector('.add-todo-modal')
    const addTodoForm = document.querySelector('#add-todo-form')
    const closeTodoBtn = document.querySelector('.close-todo-btn')
    const cancelTodoBtn = document.querySelector('.cancel-todo')
    const todoTitle = document.querySelector('.todo-title')
    const todoDes = document.querySelector('.todo-des')
    const todoDate = document.querySelector('.todo-date')
    const allTasks = document.querySelector('.all-tasks')

    let currentProjectId
    let currentlyViewedProjectId


    projectBtn.addEventListener('click', (e) => {
        e.preventDefault()
        modal.style.display = 'block'
    })

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault()
        modal.style.display = 'none'
    })

    closeEditBtn.addEventListener('click', (e) => {
        e.preventDefault()
        editProjectModal.style.display = 'none'
    })


    projectForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let projectName = projectInput.value;

        if(!projectName) return

        if(projectName){
            projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()

            const newProject = createProject(projectName)
            addProject(newProject)
            saveToStorage()

            renderProjects()

            currentlyViewedProjectId = newProject.id
            document.querySelector('.main-area-heading').textContent = newProject.name
            renderTodos(newProject.id)
            
            projectInput.value = ''
            modal.style.display = 'none'
        }
    })

    projectList.addEventListener('click', (e) => {
        e.preventDefault()

        if(e.target.closest('.bin')){
            const project = e.target.closest('.project')
            deleteProject(project.dataset.id)
            saveToStorage()
            renderProjects()
        }
        else if(e.target.closest('.edit')){
            const project = e.target.closest('.project')
            const currentName = getProjects().find((proj) => proj.id === project.dataset.id).name
            currentProjectId = project.dataset.id
            editProjectModal.style.display = 'flex'
            editProjectInput.value = currentName
        }
        else if(e.target.closest('.project')){
            const project = e.target.closest('.project')
            currentlyViewedProjectId = project.dataset.id

            const selectedProject = getProjects().find((proj) => proj.id === currentlyViewedProjectId)
            document.querySelector('.main-area-heading').textContent = selectedProject.name

            renderTodos(project.dataset.id)
        }
    })

    editProjectForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let projectName = editProjectInput.value;

        if(!projectName) return

        if(projectName){
            projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()

            editProject(currentProjectId, projectName)
            
            if(currentlyViewedProjectId === currentProjectId){
                document.querySelector('.main-area-heading').textContent = projectName
            }
              
            saveToStorage()
            renderProjects()
            editProjectInput.value = ''
            editProjectModal.style.display = 'none'
        }

    })

    mainArea.addEventListener('click', (e) => {
        e.preventDefault()

        if(e.target.closest('.bin')){
            const todo = e.target.closest('.todo-container')

            deleteToDo(currentlyViewedProjectId,todo.dataset.id)
            saveToStorage()
            renderTodos(currentlyViewedProjectId)
        }
        else if(e.target.closest('.new-todo')){
            console.log('todo button clicked')
            addTodoModal.style.display = 'flex'

            const today = new Date().toISOString().split('T')[0]
            todoDate.min = today
        }
    })

    closeTodoBtn.addEventListener('click', (e) => {
        addTodoModal.style.display = 'none'
    })

    cancelTodoBtn.addEventListener('click', (e) => {
        addTodoModal.style.display = 'none'
    })

    addTodoForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const title = todoTitle.value
        const des = todoDes.value
        const date = todoDate.value
        const priority = document.querySelector('input[name="priority"]:checked')?.value

        console.log(currentlyViewedProjectId)

        if(!title || !date || !priority) return

        const newTodo = createToDo(title, des, date, priority)
        addToDo(currentlyViewedProjectId, newTodo)
        saveToStorage()

        renderTodos(currentlyViewedProjectId)
        addTodoForm.reset()
        addTodoModal.style.display = 'none'

    })

    allTasks.addEventListener('click', (e) => {
        document.querySelector('.main-area-heading').textContent = 'All Tasks'
        const projects = getProjects()
        renderAllTasks()
    })

    

}