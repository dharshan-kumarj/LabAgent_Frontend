import ReactMarkdown from '@uiw/react-markdown-preview';
import { CodeProblem } from '../types';

interface ProblemDescriptionProps {
  problem: CodeProblem;
}

const ProblemDescription = ({ problem }: ProblemDescriptionProps) => {
  return (
    <div className="problem-container">
      <div className="p-3 border-bottom d-flex align-items-center">
        <h4 className="mb-0">{problem.title}</h4>
        <span className={`ms-3 badge badge-${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>
      </div>
      <div className="problem-description">
        <ReactMarkdown source={problem.description} />
      </div>
    </div>
  );
};

export default ProblemDescription;