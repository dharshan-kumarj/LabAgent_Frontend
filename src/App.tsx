import React from "react";
import DataScienceForm from "./components/StudentLabExercise";
import "./styles/studentlabexercise.css"; // Ensure the CSS file is in the correct location

const App: React.FC = () => {
  return (
    <div className="app-container">
      <DataScienceForm />
    </div>
  );
};

export default App;
