interface HeaderProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
  }
  
  const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">CodePractice</a>
          <div className="collapse navbar-collapse">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">Problems</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Submissions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Leaderboard</a>
              </li>
            </ul> */}
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-light btn-sm me-3"
              onClick={toggleTheme}
            >
              <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
            </button>
            {/* <div className="rounded-circle bg-secondary" style={{ width: '32px', height: '32px' }}></div> */}
          </div>
        </div>
      </nav>
    );
  };
  
  export default Header;