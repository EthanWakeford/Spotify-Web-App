import { useState } from 'react';
import { Recommendations } from './recommendations';
import { SearchResult, RecommendationResult } from './searchResults';
import apiHandler from '../services/myService';

export function Searcher() {
  const [searchResults, setSearchResults] = useState();
  const [resultOffset, setResultOffset] = useState(0);
  const [query, setQuery] = useState('');
  const [seedSelection, setSeedSelection] = useState([]);
  const [recommendationResults, setRecommendationResults] = useState();


  function searchSubmit(e) {
    if (query === '') {
      alert('You must enter search query');
      return;
    }

    apiHandler
      .searchSpotify(query, 4, 0)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
        // next offset is always reset to 4
        setResultOffset(4);
      });
  }

  function searchNextPage(e) {
    if (query === '') {
      alert('You must enter search query');
      return;
    }
    console.log(resultOffset);
    apiHandler
      .searchSpotify(query, 4, resultOffset)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
        setResultOffset(resultOffset + 4);
      });
  }

  function resultSelected(resultId) {
    if (seedSelection.includes(resultId)) {
      setSeedSelection(seedSelection.filter((id) => id !== resultId));
    } else {
      setSeedSelection([...seedSelection, resultId]);
    }
  }

  if (searchResults) {
    return (
      <>
        <label>
          Search Spotify
          <br />
          <textarea
            defaultValue={''}
            rows={1}
            cols={40}
            name='queryBox'
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <br />
        </label>
        <button type='submit' onClick={searchSubmit}>
          Search
        </button>
        <button type='submit' onClick={searchNextPage}>
          More Results
        </button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <SearchResult
            result={searchResults.artists.items[0]}
            seedSelection={seedSelection}
            customOnClick={() =>
              resultSelected(searchResults.artists.items[0].id)
            }
          />
          <SearchResult
            result={searchResults.artists.items[1]}
            seedSelection={seedSelection}
            customOnClick={() =>
              resultSelected(searchResults.artists.items[1].id)
            }
          />
          <SearchResult
            result={searchResults.artists.items[2]}
            seedSelection={seedSelection}
            customOnClick={() =>
              resultSelected(searchResults.artists.items[2].id)
            }
          />
          <SearchResult
            result={searchResults.artists.items[3]}
            seedSelection={seedSelection}
            customOnClick={() =>
              resultSelected(searchResults.artists.items[3].id)
            }
          />
        </div>
        <br />
        <Recommendations
          seedSelection={seedSelection}
          setRecommendationResults={setRecommendationResults}
        />
        {recommendationResults ? (<RecommendationResult result={recommendationResults} />) : <></>}
      </>
    );
  } else {
    return (
      <>
        <label>
          Search Spotify
          <br />
          <textarea
            defaultValue={''}
            rows={1}
            cols={40}
            name='queryBox'
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <br />
        </label>
        <button type='submit' onClick={searchSubmit}>
          Search
        </button>
      </>
    );
  }
}
