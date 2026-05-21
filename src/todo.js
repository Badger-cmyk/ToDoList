export function createToDo(title, description, dueDate, priority, completed=false) {

    return {
        id: crypto.randomUUID(),
        title,
        description,
        dueDate,
        priority, 
        completed}
}