import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl'; // Dark theme for code

const Components = () => {
  const [components, setComponents] = useState([]);
  const [viewMode, setViewMode] = useState({});
  const [loading, setLoading] = useState(true);
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
        const initialViewMode = filteredComponents.reduce((acc, comp) => {
          acc[comp.name] = 'preview';
          return acc;
        }, {});
        setViewMode(initialViewMode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching components:', error);
        setLoading(false);
      }
    };
    fetchComponents();
  }, [selectedCategory]);

  const toggleViewMode = (componentName) => {
    setViewMode((prev) => ({
      ...prev,
      [componentName]: prev[componentName] === 'preview' ? 'code' : 'preview',
    }));
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
              className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-semibold">{component.name}</h2>
                <span className="text-gray-400 text-sm">Category: {component.category}</span>
              </div>

              {/* Toggle Button */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => toggleViewMode(component.name)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  {viewMode[component.name] === 'preview' ? (
                    <>
                      <span>Edit Code</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Show Preview</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Live Preview and Editor */}
              <LiveProvider code={component.code} scope={{}}>
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 min-h-[200px]">
                  {viewMode[component.name] === 'preview' ? (
                    <>
                      <h3 className="text-gray-300 mb-2">Preview:</h3>
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <LivePreview />
                      </div>
                      <LiveError className="text-red-400 mt-2 text-sm" />
                    </>
                  ) : (
                    <>
                      <h3 className="text-gray-300 mb-2">Source Code:</h3>
                      <div className="relative">
                        <LiveEditor
                          className="rounded-lg border border-gray-700"
                          style={{
                            background: '#1a1a1a',
                            fontFamily: 'monospace',
                            padding: '1rem',
                            minHeight: '150px',
                          }}
                        />
                        <Highlight {...defaultProps} theme={theme} code={component.code} language="jsx">
                          {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre className={`${className} p-4 rounded-lg overflow-x-auto`} style={style}>
                              {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                  {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                  ))}
                                </div>
                              ))}
                            </pre>
                          )}
                        </Highlight>
                      </div>
                    </>
                  )}
                </div>
              </LiveProvider>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Components;