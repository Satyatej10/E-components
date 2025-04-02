import React from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../data/categories';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-64 h-screen p-6 fixed top-0 left-0 border-r border-gray-700">
      <h2 className="text-white text-2xl font-bold mb-8">E-commerce UI</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-semibold' : 'text-gray-300 hover:text-white transition-colors'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/components"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-semibold' : 'text-gray-300 hover:text-white transition-colors'
              }
            >
              Components
            </NavLink>
          </li>
          <li>
            <h3 className="text-gray-400 font-semibold mt-6 mb-2">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <NavLink
                    to={`/components?category=${category}`}
                    className={({ isActive }) =>
                      isActive ? 'text-indigo-500' : 'text-gray-300 hover:text-white transition-colors'
                    }
                  >
                    {category}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;