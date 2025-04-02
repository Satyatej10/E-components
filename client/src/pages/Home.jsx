import React from 'react';

const Home = () => {
  return (
    <div className="ml-64 p-8 bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-5xl font-bold mb-4">Welcome to E-commerce UI Hub</h1>
      <p className="text-gray-300 text-lg mb-8 text-center max-w-2xl">
        Explore a collection of beautifully designed e-commerce components. Preview them live and grab the source code to kickstart your project!
      </p>
      <a
        href="/components"
        className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        Explore Components
      </a>
    </div>
  );
};

export default Home;