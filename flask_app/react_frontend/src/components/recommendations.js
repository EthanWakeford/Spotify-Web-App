import apiHandler from '../services/myService';

export function Recommendations({ seedSelection, setRecommendationResults }) {
  function getRecommendations() {
    apiHandler
      .getRecommendations({ seed_artists: seedSelection.join(',') })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data)
        if (data.tracks) {
          setRecommendationResults(data.tracks)
        } else {
        setRecommendationResults(data.artists[0])
        }
      });
  }

  return (
    <>
      <button type='submit' onClick={getRecommendations}>
        Recommend Me
      </button>
    </>
  );
}
