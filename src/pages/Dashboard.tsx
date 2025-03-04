import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import Button from '../components/ui/Button';
import { Plus, FileText, Edit, Trash2, Eye } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { resumes, deleteResume } = useResumeStore();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const handleCreateNew = () => {
    navigate('/create');
  };
  
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };
  
  const handleView = (id: string) => {
    navigate(`/view/${id}`);
  };
  
  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteResume(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Button onClick={handleCreateNew} icon={<Plus size={16} />}>
          Create New Resume
        </Button>
      </div>
      
      {resumes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">No Resumes Yet</h2>
          <p className="text-gray-600 mb-6">
            Create your first resume to get started with our AI-powered resume builder.
          </p>
          <Button onClick={handleCreateNew} icon={<Plus size={16} />}>
            Create New Resume
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 truncate">{resume.title}</h2>
                <p className="text-gray-600 mb-1">{resume.basics.name}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Created: {formatDate(resume.createdAt)}</span>
                  <span>Updated: {formatDate(resume.updatedAt)}</span>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleView(resume.id)}
                  icon={<Eye size={14} />}
                >
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(resume.id)}
                  icon={<Edit size={14} />}
                >
                  Edit
                </Button>
                <Button 
                  variant={deleteConfirm === resume.id ? 'danger' : 'outline'} 
                  size="sm" 
                  onClick={() => handleDelete(resume.id)}
                  icon={<Trash2 size={14} />}
                >
                  {deleteConfirm === resume.id ? 'Confirm' : 'Delete'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;