import { getProjects } from "./controller.js"

export function saveToStorage(){
    localStorage.setItem('projects', JSON.stringify(getProjects()))
}

export function loadFromStorage(){
    const storedProjects = localStorage.getItem('projects')

    if(!storedProjects){
        return null
    }

    return JSON.parse(storedProjects)
}