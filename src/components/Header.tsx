// components/Header.tsx
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export const Header = () => {
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Spotify Recommendation</h1>
        <nav>
          <div className="hidden md:flex space-x-4">
            {session ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-2">
          <ul className="space-y-2">
            {session ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
