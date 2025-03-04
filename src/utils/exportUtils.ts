import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { Resume } from '../types';

export const exportAsPDF = async (resumeElement: HTMLElement, resume: Resume): Promise<void> => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Convert the resume element to an image
    const dataUrl = await toPng(resumeElement, { quality: 0.95 });
    
    // Add the image to the PDF
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Save the PDF
    pdf.save(`${resume.basics.name.replace(/\s+/g, '_')}_Resume.pdf`);
  } catch (error) {
    console.error('Error exporting resume as PDF:', error);
    throw error;
  }
};

export const exportAsJSON = (resume: Resume): void => {
  try {
    // Create a blob with the resume data
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.basics.name.replace(/\s+/g, '_')}_Resume.json`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting resume as JSON:', error);
    throw error;
  }
};