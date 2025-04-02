import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { fetchComponents } from "../api";

const Components = () => {
  const [selectedCategory, setSelectedCategory] = useState("cards"); // Default section
  const [components, setComponents] = useState([]);

  useEffect(() => {
    getComponents();
  }, [selectedCategory]);

  const getComponents = async () => {
    const data = await fetchComponents();
    const filtered = data.filter((component) => component.category === selectedCategory);
    setComponents(filtered);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {/* Components Display */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Components
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.length > 0 ? (
            components.map((component) => (
              <div key={component._id} className="p-4 border rounded-lg shadow">
                <h2 className="text-lg font-semibold">{component.name}</h2>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {component.code}
                </pre>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No components available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Components;
