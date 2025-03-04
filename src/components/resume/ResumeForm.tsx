import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Resume, Education, Experience, Skill, Project } from '../../types';
import { useResumeStore } from '../../store/resumeStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { Plus, Trash2, Save } from 'lucide-react';

interface ResumeFormProps {
  initialData?: Resume;
  onSave?: (resume: Resume) => void;
}

const emptyResume: Resume = {
  id: '',
  title: 'Untitled Resume',
  basics: {
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onSave }) => {
  const { addResume, updateResume } = useResumeStore();
  const [activeTab, setActiveTab] = useState('basics');
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Resume>({
    defaultValues: initialData || emptyResume,
  });
  
  const watchedValues = watch();
  
  // Education form state
  const [educationForm, setEducationForm] = useState<Education>({
    id: '',
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  
  // Experience form state
  const [experienceForm, setExperienceForm] = useState<Experience>({
    id: '',
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    highlights: [],
  });
  
  // Skill form state
  const [skillForm, setSkillForm] = useState<Skill>({
    id: '',
    name: '',
    level: 'Intermediate',
  });
  
  // Project form state
  const [projectForm, setProjectForm] = useState<Project>({
    id: '',
    name: '',
    description: '',
    url: '',
    highlights: [],
  });
  
  // Handle form submission
  const onSubmit = (data: Resume) => {
    if (initialData) {
      updateResume(initialData.id, data);
    } else {
      addResume(data);
    }
    
    if (onSave) {
      onSave(data);
    }
  };
  
  // Add education
  const handleAddEducation = () => {
    const newEducation = [...watchedValues.education, { ...educationForm, id: Math.random().toString() }];
    setValue('education', newEducation);
    setEducationForm({
      id: '',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };
  
  // Remove education
  const handleRemoveEducation = (index: number) => {
    const newEducation = [...watchedValues.education];
    newEducation.splice(index, 1);
    setValue('education', newEducation);
  };
  
  // Add experience
  const handleAddExperience = () => {
    const newExperience = [...watchedValues.experience, { ...experienceForm, id: Math.random().toString() }];
    setValue('experience', newExperience);
    setExperienceForm({
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      highlights: [],
    });
  };
  
  // Remove experience
  const handleRemoveExperience = (index: number) => {
    const newExperience = [...watchedValues.experience];
    newExperience.splice(index, 1);
    setValue('experience', newExperience);
  };
  
  // Add skill
  const handleAddSkill = () => {
    const newSkills = [...watchedValues.skills, { ...skillForm, id: Math.random().toString() }];
    setValue('skills', newSkills);
    setSkillForm({
      id: '',
      name: '',
      level: 'Intermediate',
    });
  };
  
  // Remove skill
  const handleRemoveSkill = (index: number) => {
    const newSkills = [...watchedValues.skills];
    newSkills.splice(index, 1);
    setValue('skills', newSkills);
  };
  
  // Add project
  const handleAddProject = () => {
    const newProjects = [...watchedValues.projects, { ...projectForm, id: Math.random().toString() }];
    setValue('projects', newProjects);
    setProjectForm({
      id: '',
      name: '',
      description: '',
      url: '',
      highlights: [],
    });
  };
  
  // Remove project
  const handleRemoveProject = (index: number) => {
    const newProjects = [...watchedValues.projects];
    newProjects.splice(index, 1);
    setValue('projects', newProjects);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? 'Edit Resume' : 'Create New Resume'}
      </h2>
      
      <div className="mb-6">
        <Input
          label="Resume Title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['basics', 'education', 'experience', 'skills', 'projects'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Information */}
        {activeTab === 'basics' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                {...register('basics.name', { required: 'Name is required' })}
                error={errors.basics?.name?.message}
              />
              <Input
                label="Email"
                type="email"
                {...register('basics.email', { required: 'Email is required' })}
                error={errors.basics?.email?.message}
              />
              <Input
                label="Phone"
                {...register('basics.phone')}
              />
              <Input
                label="Location"
                {...register('basics.location')}
              />
              <Input
                label="Website"
                {...register('basics.website')}
              />
            </div>
            <TextArea
              label="Professional Summary"
              {...register('basics.summary', { required: 'Summary is required' })}
              error={errors.basics?.summary?.message}
              rows={6}
            />
          </div>
        )}
        
        {/* Education */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Education</h3>
            
            {/* Education List */}
            {watchedValues.education.map((edu, index) => (
              <div key={edu.id || index} className="p-4 border rounded-md relative">
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
                <p className="font-medium">{edu.institution}</p>
                <p>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </p>
                {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
              </div>
            ))}
            
            {/* Add Education Form */}
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="text-md font-medium mb-4">Add Education</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Institution"
                  value={educationForm.institution}
                  onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                />
                <Input
                  label="Degree"
                  value={educationForm.degree}
                  onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                />
                <Input
                  label="Field of Study"
                  value={educationForm.fieldOfStudy}
                  onChange={(e) => setEducationForm({ ...educationForm, fieldOfStudy: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Start Date"
                    type="month"
                    value={educationForm.startDate}
                    onChange={(e) => setEducationForm({ ...educationForm, startDate: e.target.value })}
                  />
                  <Input
                    label="End Date"
                    type="month"
                    value={educationForm.endDate}
                    onChange={(e) => setEducationForm({ ...educationForm, endDate: e.target.value })}
                  />
                </div>
              </div>
              <TextArea
                label="Description"
                value={educationForm.description}
                onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
              />
              <Button
                type="button"
                onClick={handleAddEducation}
                disabled={!educationForm.institution || !educationForm.degree}
                icon={<Plus size={16} />}
              >
                Add Education
              </Button>
            </div>
          </div>
        )}
        
        {/* Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Work Experience</h3>
            
            {/* Experience List */}
            {watchedValues.experience.map((exp, index) => (
              <div key={exp.id || index} className="p-4 border rounded-md relative">
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
                <p className="font-medium">{exp.position}</p>
                <p>{exp.company} {exp.location && `- ${exp.location}`}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
                {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
              </div>
            ))}
            
            {/* Add Experience Form */}
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="text-md font-medium mb-4">Add Experience</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  value={experienceForm.company}
                  onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                />
                <Input
                  label="Position"
                  value={experienceForm.position}
                  onChange={(e) => setExperienceForm({ ...experienceForm, position: e.target.value })}
                />
                <Input
                  label="Location"
                  value={experienceForm.location}
                  onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Start Date"
                    type="month"
                    value={experienceForm.startDate}
                    onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                  />
                  <Input
                    label="End Date"
                    type="month"
                    value={experienceForm.endDate}
                    onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                  />
                </div>
              </div>
              <TextArea
                label="Description"
                value={experienceForm.description}
                onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                helperText="Describe your responsibilities and achievements"
              />
              <Button
                type="button"
                onClick={handleAddExperience}
                disabled={!experienceForm.company || !experienceForm.position}
                icon={<Plus size={16} />}
              >
                Add Experience
              </Button>
            </div>
          </div>
        )}
        
        {/* Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Skills</h3>
            
            {/* Skills List */}
            <div className="flex flex-wrap gap-2">
              {watchedValues.skills.map((skill, index) => (
                <div key={skill.id || index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add Skill Form */}
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="text-md font-medium mb-4">Add Skill</h4>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    label="Skill Name"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={skillForm.level}
                    onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={!skillForm.name}
                  icon={<Plus size={16} />}
                >
                  Add Skill
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Projects</h3>
            
            {/* Projects List */}
            {watchedValues.projects.map((project, index) => (
              <div key={project.id || index} className="p-4 border rounded-md relative">
                <button
                  type="button"
                  onClick={() => handleRemoveProject(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
                <p className="font-medium">{project.name}</p>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                    {project.url}
                  </a>
                )}
                {project.description && <p className="mt-2 text-sm">{project.description}</p>}
              </div>
            ))}
            
            {/* Add Project Form */}
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="text-md font-medium mb-4">Add Project</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Project Name"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                />
                <Input
                  label="Project URL"
                  value={projectForm.url}
                  onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })}
                />
              </div>
              <TextArea
                label="Description"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                helperText="Describe the project, technologies used, and your role"
              />
              <Button
                type="button"
                onClick={handleAddProject}
                disabled={!projectForm.name}
                icon={<Plus size={16} />}
              >
                Add Project
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
          <Button type="submit" icon={<Save size={16} />}>
            Save Resume
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;