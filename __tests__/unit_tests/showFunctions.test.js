// tests/showTodos.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import showTodos from "../../utils/showToDos.js";
import clearTodos from "../../utils/helper/clearTodos.js";
import todoModule from "../../modules/todoModule.js";
import projectModule from "../../modules/projectModule.js";

// Mock the modules
vi.mock("../modules/todoModule.js", () => ({
    getTodo: vi.fn(id => ({
        id,
        title: `Todo ${id}`,
        description: "Description",
        dueDate: "2023-01-01",
        priority: "High",
        notes: "Notes",
        status: "ongoing"
    }))
}));

vi.mock("../modules/projectModule.js", () => ({
    getTodos: vi.fn(() => [1, 2, 3])
}));

describe('showTodos', () => {
    let document;

    beforeEach(() => {
        // Setup a basic DOM environment using JSDOM or similar if not natively supported by Vitest
        document = {
            getElementById: vi.fn().mockReturnValue({
                appendChild: vi.fn(),
                innerHTML: ''
            }),
            createElement: vi.fn().mockImplementation(tag => ({
                setAttribute: vi.fn(),
                classList: {
                    add: vi.fn()
                },
                appendChild: vi.fn(),
                dataset: {}
            }))
        };
    });

    it('should clear existing todos and display new ones correctly', () => {
        showTodos("projectId", document);
        expect(document.getElementById).toHaveBeenCalledTimes(3); // For clearing and appending
        expect(todoModule.getTodo).toHaveBeenCalledTimes(3); // Three todos are fetched
        expect(projectModule.getTodos).toHaveBeenCalledWith("projectId");
    });
});
