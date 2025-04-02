import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

// Sample image for placeholders
const SampleImage = () => (
  <img src="https://via.placeholder.com/300x200?text=Sample+Image" alt="Sample" className="w-full h-auto" />
);

const Components = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [modalType, setModalType] = useState(null); // 'preview' or 'code'
  const location = useLocation();

  // Extract category from URL query
  const query = new URLSearchParams(location.search);
  const selectedCategory = query.get('category');

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/components');
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

  const openModal = (component, type) => {
    setSelectedComponent(component);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedComponent(null);
    setModalType(null);
  };

  if (loading) {
    return <div className="text-white text-center mt-20 ml-64">Loading components...</div>;
  }

  return (
    <div className="ml-64 p-8 min-h-screen bg-gray-900">
      <div className="container mx-auto">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          {selectedCategory ? `${selectedCategory} Components` : 'All Components'}
        </h1>
        {components.length === 0 && (
          <p className="text-gray-400 text-center">No components found for this category.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((component) => (
            <div
              key={component.name}
              className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 group relative hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-white text-xl font-semibold mb-2">{component.name}</h2>
              <p className="text-gray-400">Category: {component.category}</p>

              {/* Hover Buttons */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => openModal(component, 'preview')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <span>View Preview</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => openModal(component, 'code')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <span>View Code</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedComponent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-2xl font-semibold">{selectedComponent.name}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <LiveProvider code={selectedComponent.code} scope={{ SampleImage }}>
                {modalType === 'preview' ? (
                  <div>
                    <h3 className="text-gray-300 text-lg font-medium mb-2">Live Preview:</h3>
                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 min-h-[200px] flex items-center justify-center">
                      <LivePreview />
                    </div>
                    <LiveError className="text-red-400 mt-2 text-sm" />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-gray-300 text-lg font-medium mb-2">Source Code:</h3>
                    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                      <Highlight {...defaultProps} theme={theme} code={selectedComponent.code} language="jsx">
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                          <div
                            className={`${className} p-4 text-sm`}
                            style={{
                              ...style,
                              backgroundColor: '#1e1e1e',
                              fontFamily: "'Fira Code', 'Courier New', monospace",
                              lineHeight: '1.5',
                            }}
                          >
                            {tokens.map((line, i) => (
                              <div
                                {...getLineProps({ line, key: i })}
                                className="flex"
                              >
                                <span className="w-8 text-gray-500 text-right pr-4 select-none">
                                  {i + 1}
                                </span>
                                <span>
                                  {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                  ))}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </Highlight>
                    </div>
                  </div>
                )}
              </LiveProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Components;