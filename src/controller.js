let projects = []

export function addProject(project){
    projects.push(project)
}

export function deleteProject(projectId){
    projects = projects.filter((project) => project.id !== projectId)
}

export function getProjects(){
    return projects
}

export function addToDo(projectId, todo){
    const project = projects.find((project) => (project.id === projectId))

    if(project){
        project.todos.push(todo)
    }
}

export function deleteToDo(projectId, todoId){
    const project = projects.find((project) => (project.id === projectId))

    if(project){
        project.todos = project.todos.filter((todo) => todo.id !== todoId)
    }
}

export function editProject(projectId, newName){
    const project = projects.find((project) => project.id === projectId)

    if(project){
        project.name = newName
    }
}

export function editTodo(projectId, todoId, newTitle, newDescription){
    const project = projects.find((project) => project.id === projectId)

    if(project){
        const todo = project.todos.find((todo) => todo.id === todoId)
        if(todo){
            
        }
    }
}

export function toggleComplete(projectId, todoId){
    const project = projects.find((project) => project.id === projectId)

    if(project){
        const todo = project.todos.find((todo) => todo.id === todoId)
        
        if(todo){
            todo.completed = !todo.completed
        }
    }
}