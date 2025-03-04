import React, { useRef } from 'react';
import { Resume } from '../../types';
import { exportAsPDF, exportAsJSON } from '../../utils/exportUtils';
import Button from '../ui/Button';
import { FileDown, Printer, FileJson } from 'lucide-react';

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const handleExportPDF = async () => {
    if (resumeRef.current) {
      await exportAsPDF(resumeRef.current, resume);
    }
  };
  
  const handleExportJSON = () => {
    exportAsJSON(resume);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleExportPDF}
            icon={<FileDown size={16} />}
          >
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportJSON}
            icon={<FileJson size={16} />}
          >
            Export JSON
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.print()}
            icon={<Printer size={16} />}
          >
            Print
          </Button>
        </div>
      </div>
      
      <div 
        ref={resumeRef}
        className="border rounded-lg p-8 bg-white max-w-4xl mx-auto"
        style={{ minHeight: '29.7cm' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{resume.basics.name}</h1>
          <div className="flex justify-center flex-wrap gap-x-4 mt-2 text-gray-600">
            {resume.basics.email && <span>{resume.basics.email}</span>}
            {resume.basics.phone && <span>{resume.basics.phone}</span>}
            {resume.basics.location && <span>{resume.basics.location}</span>}
            {resume.basics.website && (
              <a href={resume.basics.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {resume.basics.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
        
        {/* Summary */}
        {resume.basics.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-3">Professional Summary</h2>
            <p>{resume.basics.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <h3 className="font-bold">{exp.position}</h3>
                    <span className="text-gray-600">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-gray-800">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  {exp.description && <p className="mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-3">Education</h2>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <span className="text-gray-600">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-gray-800">
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </p>
                  {edu.description && <p className="mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {resume.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span key={skill.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {skill.name} {skill.level && `(${skill.level})`}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects */}
        {resume.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {resume.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold">{project.name}</h3>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      {project.url}
                    </a>
                  )}
                  {project.description && <p className="mt-1">{project.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;