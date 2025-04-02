import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to E-commerce UI Library</h1>
      <p className="text-lg mb-6">
        Browse and use high-quality eCommerce components for your projects.
      </p>
      <button
        onClick={() => navigate("/components")}
        className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
      >
        Explore Components
      </button>
    </div>
  );
};

export default Home;
