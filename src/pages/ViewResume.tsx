import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import ResumePreview from '../components/resume/ResumePreview';
import AIFeedback from '../components/ai/AIFeedback';
import Button from '../components/ui/Button';
import { Resume } from '../types';
import { Edit, ArrowLeft } from 'lucide-react';

const ViewResume: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resumes, updateResume, setCurrentResume } = useResumeStore();
  const [resume, setResume] = useState<Resume | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundResume = resumes.find(r => r.id === id);
      if (foundResume) {
        setResume(foundResume);
        setCurrentResume(foundResume);
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, resumes, navigate, setCurrentResume]);
  
  const handleEdit = () => {
    if (id) {
      navigate(`/edit/${id}`);
    }
  };
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  const handleApplySuggestion = (section: string, content: string) => {
    if (!resume || !id) return;
    
    let updatedResume = { ...resume };
    
    switch (section) {
      case 'summary':
        updatedResume = {
          ...updatedResume,
          basics: {
            ...updatedResume.basics,
            summary: content,
          },
        };
        break;
      case 'experience':
        if (updatedResume.experience.length > 0) {
          const updatedExperience = [...updatedResume.experience];
          updatedExperience[0] = {
            ...updatedExperience[0],
            description: content,
          };
          updatedResume = {
            ...updatedResume,
            experience: updatedExperience,
          };
        }
        break;
      case 'skills':
        // For skills, we would need a more complex approach
        // This is a simplified version
        break;
      default:
        break;
    }
    
    updateResume(id, updatedResume);
    setResume(updatedResume);
  };
  
  if (!resume) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            onClick={handleBack}
            icon={<ArrowLeft size={16} />}
            className="mr-4"
          >
            Back
          </Button>
          <h1 className="text-3xl font-bold">{resume.title}</h1>
        </div>
        <Button 
          onClick={handleEdit}
          icon={<Edit size={16} />}
        >
          Edit Resume
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ResumePreview resume={resume} />
        <AIFeedback resume={resume} onApplySuggestion={handleApplySuggestion} />
      </div>
    </div>
  );
};

export default ViewResume;