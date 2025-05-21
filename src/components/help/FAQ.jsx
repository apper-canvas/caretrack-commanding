import { useState } from 'react';
import { getIcon } from '../../utils/iconUtils';
import { helpData } from '../../data/mockHelpData';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // Icons
  const SearchIcon = getIcon('search');
  const ChevronDownIcon = getIcon('chevron-down');
  const ChevronUpIcon = getIcon('chevron-up');

  // Handle FAQ category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setExpandedQuestions({});
  };

  // Toggle FAQ question expansion
  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery.trim() 
    ? helpData.faqs.flatMap(category => category.questions)
        .filter(question => 
          question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : helpData.faqs.find(category => category.id === activeCategory)?.questions || [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-5 w-5 text-surface-500 dark:text-surface-400" />
          </div>
          <input 
            type="search"
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Category tabs */}
      {!searchQuery.trim() && (
        <div className="flex flex-wrap gap-2 mb-6">
          {helpData.faqs.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      
      {/* FAQs */}
      <div className="space-y-4">
        {filteredFaqs.map(item => (
          <div key={item.id} className="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
            <button 
              className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-surface-50 dark:hover:bg-surface-800"
              onClick={() => toggleQuestion(item.id)}
            >
              <span>{item.question}</span>
              {expandedQuestions[item.id] ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
            </button>
            
            {expandedQuestions[item.id] && (
              <div className="p-4 pt-0 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
                <p className="text-surface-600 dark:text-surface-400">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
        
        {filteredFaqs.length === 0 && (
          <div className="text-center p-8 text-surface-500 dark:text-surface-400">
            <p>No FAQs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;