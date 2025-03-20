import React from "react";
import { useParams } from "react-router-dom";
import "../styles/ExerciseProgress.css";
import karunyaLogo from "../assets/karunya logo.png"; // ✅ Ensure correct path

const ExerciseProgress: React.FC = () => {
  const { studentId } = useParams<{ studentId?: string }>();
  const completedExercises = Math.floor(Math.random() * 11);

  return (
    <div className="progress-container">
      {/* ✅ Display the Karunya Logo */}
      <img src={karunyaLogo} alt="Karunya Logo" className="karunya-logo" />

      {/* ✅ Add a Progress Card to Ensure Visibility */}
      <div className="progress-card">
        <h1 className="progress-title">Exercise Progress for {studentId || "Unknown Student"}</h1>
        <p className="exercise-count">Completed Exercises: {completedExercises} / 10</p>

        {/* ✅ Add a Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(completedExercises / 10) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseProgress;
