import apiHandler from '../services/myService';

export function Recommendations({ seedSelection, setRecommendationResults }) {
  function getRecommendations() {
    console.log(seedSelection)
    if (seedSelection.length === 0) {
      alert('you must choose at least one seed')
      return
    }
    apiHandler
      .getRecommendations(seedSelection)
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
      }).catch((err) => {
        console.log(err)
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

