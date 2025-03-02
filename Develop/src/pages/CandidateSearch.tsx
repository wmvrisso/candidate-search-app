import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentCandidate, setCurrentCandidate] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const data = await searchGithub();
      console.log(data);
      setCandidates(data);
    }

    getData();
  }, []);

  useEffect(() => {
    async function getUserData() {
      const userData = await searchGithubUser(candidates[currentIndex].login);
      console.log(userData);
      setCurrentCandidate(userData);
    }
    getUserData();
  }, [candidates, currentIndex]);

  function goToNextCandidate() {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // setCurrentCandidate(0);
      alert("Reached the end of list");
    }
  }

  return (
    <div className="candidate-search">
      <div className="card">
        <h1>Candidate Search</h1>
        <img src={currentCandidate.avatar_url} alt="Octocat" />
        <h2>{currentCandidate.login}</h2>
        <p>Location: {currentCandidate.location || "No location provided"}</p>
        <p>Email: {currentCandidate.email || "No email provided"}</p>
        <p>Company: {currentCandidate.company || "No company provided"}</p>
        <p>Bio: {currentCandidate.bio || "No bio provided"}</p>
      </div>
      <button onClick={goToNextCandidate}>
        <p>-</p>
      </button>
      <button
        onClick={() => {
          // save the current candidate to local storage

          goToNextCandidate();
        }}
      >
        <p>+</p>
      </button>
    </div>
  );
};

export default CandidateSearch;
