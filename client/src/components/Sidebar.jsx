import { Link } from "react-router-dom";
import { categories } from "../data/categories";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="w-1/4 p-4 border-r min-h-screen">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <button
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left p-2 rounded ${
                selectedCategory === category.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
