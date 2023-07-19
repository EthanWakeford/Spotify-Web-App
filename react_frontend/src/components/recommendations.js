import apiHandler from '../services/myService';

export function Recommendations({
  seedSelection,
  setRecommendationResults,
  songAttributes,
}) {
  function getRecommendations() {
    console.log(seedSelection);
    if (seedSelection.length === 0) {
      alert('you must choose at least one seed');
      return;
    }
    apiHandler
      .getRecommendations(seedSelection, songAttributes)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.tracks) {
          setRecommendationResults(data.tracks);
        } else {
          setRecommendationResults(data.artists[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <button type='submit' onClick={getRecommendations} style={{height: '30px', width: '150px'}}>
        Recommend Me
      </button>
    </>
  );
}
