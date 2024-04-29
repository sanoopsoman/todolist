import { describe, it, expect } from 'vitest';
import projectModule from '../modules/projectModule.js';

describe('Project Module', () => {
    it('should have a project module', () => {
        expect(projectModule).toBeDefined();
    })

    it('should add a new project', () => {
        projectModule.addProject('New Project');
        const project = projectModule.getProjects();
        expect(project[0].title).toBe('New Project');
        expect(project.length).toBe(1);
    })

    it('should add a second project', () => {
        projectModule.addProject('Second Project');
        const project = projectModule.getProjects();
        expect(project[1].title).toBe('Second Project');
        expect(project.length).toBe(2);
    });

    it('should delete second project', () => {
        const project = projectModule.getProjects();
        expect(project.length).toBe(2);
        projectModule.deleteProjects(project[0].id);
        const updatedProjects = projectModule.getProjects();
        expect(updatedProjects.length).toBe(1);
        expect(updatedProjects[0].title).toBe('Second Project');
    })
})