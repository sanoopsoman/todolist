import { describe, it, expect } from 'vitest';
import todoModule from '../modules/todoModule.js'

describe('todoModule', () => {
    it('todoModule should be defined', () => {
        expect(todoModule).toBeDefined();
    })

    it('should be able to add a todo', () => {
        todoModule.addTodo('Buy groceries', 'Milk, eggs, bread', '2022-12-31', 'high', 'Remember to buy organic milk', ['Milk', 'Eggs', 'Bread']);
        expect(todoModule.getTodos().length).toBe(1);
        const todoList = todoModule.getTodos();
        const todo = todoList[0];
        expect(todo.title).toBe('Buy groceries');
        expect(todo.description).toBe('Milk, eggs, bread');
        expect(todo.dueDate).toBe('2022-12-31');
        expect(todo.priority).toBe('high');
        expect(todo.notes).toBe('Remember to buy organic milk');
        expect(todo.checklist).toEqual(['Milk', 'Eggs', 'Bread']);
        expect(todo.status).toEqual('todo');
    })

    it('should be able to add a second todo', () => {
        todoModule.addTodo('Clean the house', 'Vacuum, dust, mop', '2022-12-31', 'medium', 'Start with the living room', ['Vacuum', 'Dust', 'Mop']);
        expect(todoModule.getTodos().length).toBe(2);
        const todoList = todoModule.getTodos();
        const todo2 = todoList[1];
        expect(todo2.title).toBe('Clean the house');
        expect(todo2.description).toBe('Vacuum, dust, mop');
        expect(todo2.dueDate).toBe('2022-12-31');
        expect(todo2.priority).toBe('medium');
        expect(todo2.notes).toBe('Start with the living room');
        expect(todo2.checklist).toEqual(['Vacuum', 'Dust', 'Mop']);
        expect(todo2.status).toEqual('todo');
    })

    it('should be able to add a third todo', () => {
        todoModule.addTodo('Go for a run', '5 miles', '2022-12-31', 'low', 'Remember to stretch before and after', []);
        expect(todoModule.getTodos().length).toBe(3);
        const todoList = todoModule.getTodos();
        const todo3 = todoList[2];
        expect(todo3.title).toBe('Go for a run');
        expect(todo3.description).toBe('5 miles');
        expect(todo3.dueDate).toBe('2022-12-31');
        expect(todo3.priority).toBe('low');
        expect(todo3.notes).toBe('Remember to stretch before and after');
        expect(todo3.checklist).toEqual([]);
        expect(todo3.status).toEqual('todo');

    })

    it('should complete the second todo', () => {
        const todoList = todoModule.getTodos();
        const todo2 = todoList[1];
        todoModule.updateTodoStatus(todo2.id, 'done');
        expect(todo2.status).toBe('done');
    })

    it('should delete the first todo', () => {
        const todoList = todoModule.getTodos();
        const todo1 = todoList[0];
        todoModule.deleteTodo(todo1.id);
        expect(todoModule.getTodos().length).toBe(2);
    })
})