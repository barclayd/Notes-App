import React from 'react';
import './App.css';
import { NavBar } from './NavBar';

function App() {
  return (
    <>
      <NavBar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Simple Notes
          </h1>
          <h3 className="text-1xl leading-tight text-gray-700 mt-2">
            Quick, fast and easy to use notes app available across all devices
          </h3>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
