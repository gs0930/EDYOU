import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


import { useQuery } from "convex/react";
import { api } from "./convex/_generated/api";
import React from 'react';
import LearningPreferences from './LearningPreferences';

function App() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="App">
      <h1>EdYou</h1>
      <LearningPreferences />
     
    </div>
  );
}

export default App;
