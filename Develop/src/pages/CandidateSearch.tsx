import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

interface Candidate {
  login: string;
  avatar_url: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
}

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const data: Candidate[] = await searchGithub();
      console.log(data);
      setCandidates(data);
    };

    getData();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (candidates[currentIndex]) {
        const userData: Candidate = await searchGithubUser(
          candidates[currentIndex].login
        );
        console.log(userData);
        setCurrentCandidate(userData);
      }
    };

    getUserData();
  }, [candidates, currentIndex]);

  const goToNextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Reached the end of list");
    }
  };

  const saveCandidateToLocalStorage = () => {
    const savedData: Candidate[] = JSON.parse(
      localStorage.getItem("savedData") || "[]"
    );
    if (currentCandidate) {
      savedData.push(currentCandidate);
      localStorage.setItem("savedData", JSON.stringify(savedData));
    }
    goToNextCandidate();
  };

  return (
    <div className="candidate-search">
      <div className="card">
        <h1>Candidate Search</h1>
        {currentCandidate && (
          <>
            <img src={currentCandidate.avatar_url} alt="Octocat" />
            <h2>{currentCandidate.login}</h2>
            <p>
              Location: {currentCandidate.location || "No location provided"}
            </p>
            <p>Email: {currentCandidate.email || "No email provided"}</p>
            <p>Company: {currentCandidate.company || "No company provided"}</p>
            <p>Bio: {currentCandidate.bio || "No bio provided"}</p>
          </>
        )}
      </div>
      <button onClick={goToNextCandidate}>
        <p>-</p>
      </button>
      <button onClick={saveCandidateToLocalStorage}>
        <p>+</p>
      </button>
    </div>
  );
};

export default CandidateSearch;
