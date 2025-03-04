export interface Resume {
  id: string;
  title: string;
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  highlights: string[];
}

export interface AIFeedback {
  summary: string;
  suggestions: {
    section: string;
    content: string;
    suggestion: string;
  }[];
  score: number;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  description: string;
}