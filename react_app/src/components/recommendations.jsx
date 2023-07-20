import { useState } from 'react';
import { CreatePlaylist } from './createPlaylist';
import apiHandler from '../services/myService';
import PropTypes from 'prop-types';

export function Recommendations({ seedSelection, songAttributes }) {
  const [recommendationResults, setRecommendationResults] = useState([]);

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
      <button
        type='submit'
        onClick={getRecommendations}
        style={{ height: '30px', width: '150px' }}
      >
        Recommend Me
      </button>
      <CreatePlaylist
        recommendationResults={recommendationResults}
      ></CreatePlaylist>
      {recommendationResults
        ? recommendationResults.map((x, index) => (
            <RecommendationResult
              key={recommendationResults[index].id}
              result={recommendationResults[index]}
            />
          ))
        : null}
    </>
  );
}

Recommendations.propTypes = {
  seedSelection: PropTypes.array,
  setRecommendationResults: PropTypes.func,
  songAttributes: PropTypes.object,
};

export function RecommendationResult({ result }) {
  return (
    <div>
      <h4>
        {result.name}: {result.artists[0].name}
      </h4>
    </div>
  );
}

RecommendationResult.propTypes = {
  result: PropTypes.object,
};
