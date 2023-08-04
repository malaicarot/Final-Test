export const toDoListStorage = {
    load: () => JSON.parse(localStorage.getItem('todoList')) ?? [],
    save: arr => localStorage.setItem('todoList', JSON.stringify(arr)),
    removeAll: () => localStorage.removeItem('todoList'),
};