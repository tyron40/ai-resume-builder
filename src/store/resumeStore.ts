import { create } from 'zustand';
import { Resume, Education, Experience, Skill, Project } from '../types';

interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  setCurrentResume: (resume: Resume) => void;
  addResume: (resume: Resume) => void;
  updateResume: (id: string, resume: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
  
  // Section specific actions
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Load from localStorage if available
const loadResumes = (): Resume[] => {
  const saved = localStorage.getItem('resumes');
  return saved ? JSON.parse(saved) : [];
};

// Save to localStorage
const saveResumes = (resumes: Resume[]) => {
  localStorage.setItem('resumes', JSON.stringify(resumes));
};

export const useResumeStore = create<ResumeState>((set) => ({
  resumes: loadResumes(),
  currentResume: null,
  
  setCurrentResume: (resume) => set({ currentResume: resume }),
  
  addResume: (resume) => set((state) => {
    const newResumes = [...state.resumes, { 
      ...resume, 
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: newResumes[newResumes.length - 1] };
  }),
  
  updateResume: (id, updatedResume) => set((state) => {
    const newResumes = state.resumes.map(resume => 
      resume.id === id 
        ? { ...resume, ...updatedResume, updatedAt: new Date() } 
        : resume
    );
    saveResumes(newResumes);
    
    // Update current resume if it's the one being edited
    const currentResume = state.currentResume && state.currentResume.id === id
      ? { ...state.currentResume, ...updatedResume, updatedAt: new Date() }
      : state.currentResume;
      
    return { resumes: newResumes, currentResume };
  }),
  
  deleteResume: (id) => set((state) => {
    const newResumes = state.resumes.filter(resume => resume.id !== id);
    saveResumes(newResumes);
    
    // Reset current resume if it's the one being deleted
    const currentResume = state.currentResume && state.currentResume.id === id
      ? null
      : state.currentResume;
      
    return { resumes: newResumes, currentResume };
  }),
  
  // Education actions
  addEducation: (education) => set((state) => {
    if (!state.currentResume) return state;
    
    const newEducation = { ...education, id: generateId() };
    const updatedResume = {
      ...state.currentResume,
      education: [...state.currentResume.education, newEducation],
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  updateEducation: (id, updatedEducation) => set((state) => {
    if (!state.currentResume) return state;
    
    const updatedEducationList = state.currentResume.education.map(edu => 
      edu.id === id ? { ...edu, ...updatedEducation } : edu
    );
    
    const updatedResume = {
      ...state.currentResume,
      education: updatedEducationList,
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  deleteEducation: (id) => set((state) => {
    if (!state.currentResume) return state;
    
    const updatedEducationList = state.currentResume.education.filter(edu => edu.id !== id);
    
    const updatedResume = {
      ...state.currentResume,
      education: updatedEducationList,
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  // Experience actions
  addExperience: (experience) => set((state) => {
    if (!state.currentResume) return state;
    
    const newExperience = { ...experience, id: generateId() };
    const updatedResume = {
      ...state.currentResume,
      experience: [...state.currentResume.experience, newExperience],
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  updateExperience: (id, updatedExperience) => set((state) => {
    if (!state.currentResume) return state;
    
    const updatedExperienceList = state.currentResume.experience.map(exp => 
      exp.id === id ? { ...exp, ...updatedExperience } : exp
    );
    
    const updatedResume = {
      ...state.currentResume,
      experience: updatedExperienceList,
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  deleteExperience: (id) => set((state) => {
    if (!state.currentResume) return state;
    
    const updatedExperienceList = state.currentResume.experience.filter(exp => exp.id !== id);
    
    const updatedResume = {
      ...state.currentResume,
      experience: updatedExperienceList,
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  // Skill actions
  addSkill: (skill) => set((state) => {
    if (!state.currentResume) return state;
    
    const newSkill = { ...skill, id: generateId() };
    const updatedResume = {
      ...state.currentResume,
      skills: [...state.currentResume.skills, newSkill],
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  updateSkill: (id, updatedSkill) => set((state) => {
    if (!state.currentResume) return state;
    
    const updatedSkillList = state.currentResume.skills.map(skill => 
      skill.id === id ? { ...skill, ...updatedSkill } : skill
    );
    
    const updatedResume = {
      ...state.currentResume,
      skills: updatedSkillList,
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  deleteSkill: (id) => set((state) => {
    if (!state.currentResume) return state;
    
    const updatedSkillList = state.currentResume.skills.filter(skill => skill.id !== id);
    
    const updatedResume = {
      ...state.currentResume,
      skills: updatedSkillList,
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  // Project actions
  addProject: (project) => set((state) => {
    if (!state.currentResume) return state;
    
    const newProject = { ...project, id: generateId() };
    const updatedResume = {
      ...state.currentResume,
      projects: [...state.currentResume.projects, newProject],
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  updateProject: (id, updatedProject) => set((state) => {
    if (!state.currentResume) return state;
    
    const updatedProjectList = state.currentResume.projects.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    );
    
    const updatedResume = {
      ...state.currentResume,
      projects: updatedProjectList,
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
  
  deleteProject: (id) => set((state) => {
    if (!state.currentResume) return state;
    
    const updatedProjectList = state.currentResume.projects.filter(project => project.id !== id);
    
    const updatedResume = {
      ...state.currentResume,
      projects: updatedProjectList,
      updatedAt: new Date()
    };
    
    const newResumes = state.resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    
    saveResumes(newResumes);
    return { resumes: newResumes, currentResume: updatedResume };
  }),
}));