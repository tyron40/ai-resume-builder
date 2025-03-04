import React, { useState } from 'react';
import { Resume, AIFeedback as AIFeedbackType, JobDescription } from '../../types';
import { getResumeFeedback, tailorResumeForJob, improveSection } from '../../services/openai';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import { Sparkles, Target, Lightbulb, RefreshCw } from 'lucide-react';

interface AIFeedbackProps {
  resume: Resume;
  onApplySuggestion?: (section: string, content: string) => void;
}

const AIFeedback: React.FC<AIFeedbackProps> = ({ resume, onApplySuggestion }) => {
  const [feedback, setFeedback] = useState<AIFeedbackType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [tailoredFeedback, setTailoredFeedback] = useState<AIFeedbackType | null>(null);
  const [isTailoring, setIsTailoring] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [improvingSection, setImprovingSection] = useState<string | null>(null);
  
  const handleGetFeedback = async () => {
    setIsLoading(true);
    try {
      const result = await getResumeFeedback(resume);
      setFeedback(result);
    } catch (error) {
      console.error('Error getting feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTailorResume = async () => {
    if (!jobDescription.trim()) return;
    
    setIsTailoring(true);
    try {
      const mockJobDesc: JobDescription = {
        id: 'job-1',
        title: 'Software Developer',
        company: 'Tech Company',
        description: jobDescription,
      };
      
      const result = await tailorResumeForJob(resume, mockJobDesc);
      setTailoredFeedback(result);
    } catch (error) {
      console.error('Error tailoring resume:', error);
    } finally {
      setIsTailoring(false);
    }
  };
  
  const handleImproveSection = async (section: string, content: string) => {
    setImprovingSection(section);
    try {
      const improvedContent = await improveSection(section, content);
      if (onApplySuggestion) {
        onApplySuggestion(section, improvedContent);
      }
    } catch (error) {
      console.error('Error improving section:', error);
    } finally {
      setImprovingSection(null);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">AI Resume Assistant</h2>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'general'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            General Feedback
          </button>
          <button
            onClick={() => setActiveTab('tailor')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tailor'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tailor for Job
          </button>
        </nav>
      </div>
      
      {/* General Feedback Tab */}
      {activeTab === 'general' && (
        <div>
          {!feedback ? (
            <div className="text-center py-8">
              <Sparkles className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">Get AI Feedback on Your Resume</h3>
              <p className="text-gray-600 mb-6">
                Our AI will analyze your resume and provide suggestions to improve it.
              </p>
              <Button 
                onClick={handleGetFeedback} 
                isLoading={isLoading}
                icon={<Lightbulb size={16} />}
              >
                Analyze My Resume
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Resume Score</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleGetFeedback}
                    icon={<RefreshCw size={14} />}
                  >
                    Refresh
                  </Button>
                </div>
                <div className="mt-2 bg-gray-100 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full" 
                    style={{ width: `${feedback.score}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Your resume scores {feedback.score}/100
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Summary</h3>
                <p className="p-4 bg-blue-50 rounded-md">{feedback.summary}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Suggestions</h3>
                <div className="space-y-4">
                  {feedback.suggestions.map((suggestion, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{suggestion.section}</h4>
                        <Button 
                          size="sm" 
                          onClick={() => handleImproveSection(suggestion.section.toLowerCase(), suggestion.content)}
                          isLoading={improvingSection === suggestion.section.toLowerCase()}
                        >
                          Apply Suggestion
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{suggestion.content}</p>
                      <div className="mt-2 p-3 bg-green-50 rounded border-l-4 border-green-500">
                        <p className="text-sm">{suggestion.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Tailor for Job Tab */}
      {activeTab === 'tailor' && (
        <div>
          <div className="mb-6">
            <TextArea
              label="Paste Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to get tailored suggestions for your resume..."
              rows={6}
            />
            <div className="mt-2">
              <Button 
                onClick={handleTailorResume} 
                isLoading={isTailoring}
                disabled={!jobDescription.trim()}
                icon={<Target size={16} />}
              >
                Tailor My Resume
              </Button>
            </div>
          </div>
          
          {tailoredFeedback && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Job Match Score</h3>
                <div className="mt-2 bg-gray-100 rounded-full h-4">
                  <div 
                    className="bg-green-600 h-4 rounded-full" 
                    style={{ width: `${tailoredFeedback.score}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Your resume matches {tailoredFeedback.score}% of the job requirements
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Analysis</h3>
                <p className="p-4 bg-green-50 rounded-md">{tailoredFeedback.summary}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Tailoring Suggestions</h3>
                <div className="space-y-4">
                  {tailoredFeedback.suggestions.map((suggestion, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{suggestion.section}</h4>
                        <Button 
                          size="sm" 
                          onClick={() => handleImproveSection(suggestion.section.toLowerCase(), suggestion.content)}
                          isLoading={improvingSection === suggestion.section.toLowerCase()}
                        >
                          Apply Suggestion
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{suggestion.content}</p>
                      <div className="mt-2 p-3 bg-green-50 rounded border-l-4 border-green-500">
                        <p className="text-sm">{suggestion.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIFeedback;