import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeForm from '../components/resume/ResumeForm';
import { Resume } from '../types';

const CreateResume: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSave = (resume: Resume) => {
    navigate('/dashboard');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Resume</h1>
      <ResumeForm onSave={handleSave} />
    </div>
  );
};

export default CreateResume;