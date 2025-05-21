import { useState } from 'react';
import { getIcon } from '../../utils/iconUtils';
import { helpData } from '../../data/mockHelpData';

const Troubleshooting = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Icons
  const SearchIcon = getIcon('search');
  const AlertCircleIcon = getIcon('alert-circle');
  const ArrowLeftIcon = getIcon('arrow-left');
  const CheckCircleIcon = getIcon('check-circle');
  const CrossIcon = getIcon('x');

  // Filter issues based on search
  const filteredIssues = searchQuery.trim()
    ? helpData.troubleshooting.filter(issue => 
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : helpData.troubleshooting;

  // Render issue details when an issue is selected
  if (selectedIssue) {
    const issue = helpData.troubleshooting.find(i => i.id === selectedIssue);
    
    return (
      <div className="p-6">
        <button 
          className="flex items-center text-primary mb-4 hover:underline"
          onClick={() => setSelectedIssue(null)}
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to all issues
        </button>
        
        <div className="flex items-center mb-4">
          <AlertCircleIcon className="h-6 w-6 mr-2 text-red-500" />
          <h2 className="text-xl font-semibold">{issue.title}</h2>
        </div>
        
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          {issue.description}
        </p>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Symptoms</h3>
          <ul className="list-disc pl-5 space-y-2 text-surface-600 dark:text-surface-400">
            {issue.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Solution Steps</h3>
          <ol className="space-y-4">
            {issue.steps.map((step, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-medium mr-3">
                  {index + 1}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
  
  // Render the list of issues
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Troubleshooting Guide</h2>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-5 w-5 text-surface-500 dark:text-surface-400" />
        </div>
        <input 
          type="search"
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search for issues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        {filteredIssues.map(issue => (
          <div 
            key={issue.id}
            className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors"
            onClick={() => setSelectedIssue(issue.id)}
          >
            <div className="flex items-center mb-2">
              <AlertCircleIcon className="h-5 w-5 mr-2 text-red-500" />
              <h3 className="font-medium">{issue.title}</h3>
            </div>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              {issue.description}
            </p>
          </div>
        ))}
        
        {filteredIssues.length === 0 && (
          <div className="text-center p-8 text-surface-500 dark:text-surface-400">
            <p>No issues found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Troubleshooting;