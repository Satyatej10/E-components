import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Components = () => {
  const [components, setComponents] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Extract category from URL query
  const query = new URLSearchParams(location.search);
  const selectedCategory = query.get('category');

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/components'); // Replace with your API
        let filteredComponents = response.data;
        if (selectedCategory) {
          filteredComponents = response.data.filter(
            (comp) => comp.category === selectedCategory
          );
        }
        setComponents(filteredComponents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching components:', error);
        setLoading(false);
      }
    };
    fetchComponents();
  }, [selectedCategory]);

  const renderPreview = (code) => {
    return <div dangerouslySetInnerHTML={{ __html: code }} />;
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading components...</div>;
  }

  return (
    <div className="ml-64 p-8 bg-gray-900 min-h-screen">
      <h1 className="text-white text-4xl font-bold mb-8">
        {selectedCategory ? `${selectedCategory} Components` : 'All Components'}
      </h1>
      {components.length === 0 && (
        <p className="text-gray-400">No components found for this category.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {components.map((component) => (
          <div
            key={component.name}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all"
          >
            <h2 className="text-white text-xl font-semibold mb-4">{component.name}</h2>
            <p className="text-gray-400 mb-4">Category: {component.category}</p>
            <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <h3 className="text-gray-300 mb-2">Preview:</h3>
              {renderPreview(component.code)}
            </div>
            <button
              onClick={() => setSelectedCode(selectedCode === component.code ? null : component.code)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {selectedCode === component.code ? 'Hide Code' : 'View Source Code'}
            </button>
            {selectedCode === component.code && (
              <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{component.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Components;