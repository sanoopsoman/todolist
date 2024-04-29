function clearTodos(document) {
    ['todo-tasks', 'ongoing-tasks', 'done-tasks'].forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = '';
        }
    });
}

export default clearTodos;