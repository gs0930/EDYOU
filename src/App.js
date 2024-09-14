import './App.css';

// import { useQuery } from "convex/react";
// import { api } from "./convex/_generated/api";
import React from 'react';
import LearningPreferences from './LearningPreferences';

function App() {
 // const tasks = useQuery(api.tasks.get);
  return (
    <div className="App">
      <h1>EdYou</h1>
      <LearningPreferences />

    </div>
  );
}

export default App;
