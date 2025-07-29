import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/viva.css";

const Experiment1Viva: React.FC = () => {
  const navigate = useNavigate();

  // Viva MCQs
  const questions = [
    { id: 1, question: "What is React?", options: ["Library", "Framework", "Language", "Database"] },
    { id: 2, question: "What is JSX?", options: ["Java Syntax", "XML", "HTML in JavaScript", "Python"] },
    { id: 3, question: "Which Hook is used for state?", options: ["useEffect", "useState", "useRef", "useMemo"] },
    { id: 4, question: "What is the virtual DOM?", options: ["A real DOM", "A copy of real DOM", "A database", "A function"] },
    { id: 5, question: "Which is a state management tool?", options: ["Redux", "Axios", "CSS", "Bootstrap"] },
    { id: 6, question: "Which command creates a React app?", options: ["npx create-react-app", "npm install", "npm start", "react init"] },
    { id: 7, question: "Which company developed React?", options: ["Google", "Facebook", "Microsoft", "Amazon"] },
    { id: 8, question: "What is the use of useEffect?", options: ["To manage side-effects", "To store state", "To create UI", "None"] },
    { id: 9, question: "Which lifecycle method runs after render?", options: ["componentDidMount", "render", "constructor", "componentWillUnmount"] },
    { id: 10, question: "Which React version introduced Hooks?", options: ["15", "16.8", "17", "18"] },
  ];

  // State for answers
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showPopup, setShowPopup] = useState(false);

  // Handle answer selection
  const handleSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Check if all questions are answered
  const isAllAnswered = Object.keys(answers).length === questions.length;

  // Handle form submission
  const handleSubmit = () => {
    if (!isAllAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Show confirmation before submitting
    const confirmSubmit = window.confirm("Are you sure you want to submit your answers?");
    if (!confirmSubmit) return;

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      navigate("/home"); // Redirect to home page after 3 sec
    }, 3000);
  };

  return (
    <div className="viva-container">
      <h1>Experiment 1</h1>
      <h2>VIVA</h2>

      {/* Viva Questions List */}
      <div className="question-list">
        {questions.map((q) => (
          <div key={q.id} className="question">
            <p>{q.id}. {q.question}</p>
            {q.options.map((option) => (
              <label key={option} className="option-label">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleSelect(q.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button className="submit-button" onClick={handleSubmit} disabled={!isAllAnswered}>
        Submit
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="modal">
          <div className="modal-content">
            <h3>🎉 Viva Completed!</h3>
            <p>You have successfully completed your viva.</p>
            <button className="close-btn" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experiment1Viva;
