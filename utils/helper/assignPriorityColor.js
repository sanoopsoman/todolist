function assignPriorityColor(element, priority) {
    switch (priority) {
        case 'High':
            element.classList.add('priority-high');
            break;
        case 'Medium':
            element.classList.add('priority-medium');
            break;
        case 'Low':
            element.classList.add('priority-low');
            break;
        default:
            element.classList.remove('priority-high', 'priority-medium', 'priority-low');
            break;
    }
}

export default assignPriorityColor;