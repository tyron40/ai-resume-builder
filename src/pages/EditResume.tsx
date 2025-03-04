import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import ResumeForm from '../components/resume/ResumeForm';
import { Resume } from '../types';

const EditResume: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resumes, setCurrentResume } = useResumeStore();
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
  
  const handleSave = (resume: Resume) => {
    navigate('/dashboard');
  };
  
  if (!resume) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Resume</h1>
      <ResumeForm initialData={resume} onSave={handleSave} />
    </div>
  );
};

export default EditResume;