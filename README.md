# AI Resume Builder

![AI Resume Builder](https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)

## Overview

AI Resume Builder is a modern web application that helps users create professional resumes with the assistance of AI. The application provides an intuitive interface for building resumes and leverages artificial intelligence to offer suggestions for improvement and job-specific tailoring.

## Features

- **User-friendly Resume Builder**: Create and edit resumes with an intuitive form interface
- **AI-Powered Feedback**: Get intelligent suggestions to improve your resume content
- **Job Tailoring**: Customize your resume for specific job descriptions to increase your chances of getting hired
- **Multiple Resume Management**: Create and manage multiple resumes for different job applications
- **Export Options**: Download your resume as PDF or JSON
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **PDF Generation**: jsPDF, html-to-image
- **AI Integration**: OpenAI API (simulated in the current version)
- **Routing**: React Router
- **UI Components**: Custom components with Lucide React icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
ai-resume-builder/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ai/          # AI-related components
│   │   ├── resume/      # Resume-related components
│   │   └── ui/          # Basic UI components
│   ├── pages/           # Application pages
│   ├── services/        # API services
│   ├── store/           # State management
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .eslintrc.js         # ESLint configuration
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Usage

### Creating a Resume

1. Navigate to the dashboard and click "Create New Resume"
2. Fill in your personal information, education, experience, skills, and projects
3. Save your resume

### Getting AI Feedback

1. View your resume
2. Navigate to the "AI Resume Assistant" section
3. Click "Analyze My Resume" to get general feedback
4. Use the "Tailor for Job" tab to customize your resume for specific job descriptions

### Exporting Your Resume

1. View your resume
2. Click "Export PDF" to download a PDF version
3. Click "Export JSON" to download a JSON version for future editing

## Development

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Future Enhancements

- Integration with real OpenAI API
- Additional resume templates
- Cover letter generation
- Job application tracking
- Integration with job boards
- User authentication and cloud storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [OpenAI](https://openai.com/)
- [Lucide Icons](https://lucide.dev/)
