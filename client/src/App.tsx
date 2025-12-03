// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { useEffect, useState } from "react";

function App() {
  const [backendMessage, setBackendMessage] = useState<string>("Checking backend...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/health");
        const data: { status: string; message: string } = await res.json();
        setBackendMessage(`${data.status.toUpperCase()}: ${data.message}`);
      } catch (error) {
        console.error(error);
        setBackendMessage("❌ Cannot reach backend");
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start">
      <div className="w-full max-w-3xl p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">SkillSwap</h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome! This is your Full-Stack + GenAI project starting point.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Backend Status</h2>
        <p className="text-gray-600">{backendMessage}</p>
      </div>
    </div>
  );
}

export default App;


