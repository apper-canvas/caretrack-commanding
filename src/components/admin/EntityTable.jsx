import { useState } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils.js';

const EntityTable = ({ 
  title, 
  data, 
  columns, 
  isLoading, 
  onAdd, 
  onEdit, 
  onDelete, 
  onView,
  pagination = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Icons
  const SearchIcon = getIcon('search');
  const EditIcon = getIcon('edit');
  const TrashIcon = getIcon('trash-2');
  const EyeIcon = getIcon('eye');
  const PlusIcon = getIcon('plus');
  const SortAscIcon = getIcon('chevron-up');
  const SortDescIcon = getIcon('chevron-down');
  
  // Filtering function
  const filteredData = data ? data.filter(item => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return columns.some(column => {
      const value = item[column.key];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(searchLower);
    });
  }) : [];

  // Sorting function
  const sortedData = sortColumn 
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        
        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        const comparison = String(aValue).localeCompare(String(bValue));
        return sortDirection === 'asc' ? comparison : -comparison;
      })
    : filteredData;

  // Handle sort
  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  return (
    <motion.div 
      className="card overflow-hidden w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        
        <div className="mt-3 sm:mt-0 flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          
          {onAdd && (
            <button 
              onClick={onAdd}
              className="btn btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              <span>Add New</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto -mx-4 sm:-mx-6">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
            <thead className="bg-surface-50 dark:bg-surface-800">
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.key} 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => column.sortable !== false && handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {sortColumn === column.key && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <SortAscIcon className="h-4 w-4" /> : <SortDescIcon className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : sortedData.length > 0 ? (
                sortedData.map((item, idx) => (
                  <tr key={item.Id || idx} className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                    {columns.map((column) => (
                      <td key={`${item.Id || idx}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm">
                        {column.render ? column.render(item[column.key], item) : String(item[column.key] || '')}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end space-x-2">
                        {onView && (
                          <button 
                            onClick={() => onView(item)} 
                            className="p-1 rounded-full text-surface-500 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                            title="View details"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        )}
                        {onEdit && (
                          <button 
                            onClick={() => onEdit(item)} 
                            className="p-1 rounded-full text-surface-500 hover:text-blue-500 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                            title="Edit"
                          >
                            <EditIcon className="h-5 w-5" />
                          </button>
                        )}
                        {onDelete && (
                          <button 
                            onClick={() => onDelete(item)} 
                            className="p-1 rounded-full text-surface-500 hover:text-red-500 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                            title="Delete"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-sm text-surface-500 dark:text-surface-400">
                    {searchTerm ? `No items found matching "${searchTerm}"` : "No items found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {pagination && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-surface-200 dark:border-surface-700">
          {pagination}
        </div>
      )}
    </motion.div>
  );
};

export default EntityTable;