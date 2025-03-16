const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link active">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/savedcandidates" className="nav-link">
            Potential Candidates
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
