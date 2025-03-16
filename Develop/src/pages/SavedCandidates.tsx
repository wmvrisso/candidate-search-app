import { useEffect, useState } from "react";

interface Candidate {
  id: number;
  avatar_url: string;
  login: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
}

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedData: Candidate[] = JSON.parse(
      localStorage.getItem("savedData") || "[]"
    );
    setSavedCandidates(savedData);
  }, []);

  const handleRejectCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== id
    );

    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedData", JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h1>Potential Candidates</h1>

      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <img
                  src={candidate.avatar_url}
                  alt="Avatar"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{candidate.login}</td>
              <td>{candidate.location || "No location provided"}</td>
              <td>{candidate.email || "No email provided"}</td>
              <td>{candidate.company || "No company provided"}</td>
              <td>{candidate.bio || "No bio provided"}</td>
              <td>
                <button onClick={() => handleRejectCandidate(candidate.id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
