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
  const [seedType, setSeedType] = useState('artist');

  function searchSubmit(e) {
    if (query === '') {
      alert('You must enter search query');
      return;
    }

    apiHandler
      .searchSpotify(query, 6, 0, seedType)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
        // next offset is always reset to 6
        setResultOffset(6);
      });
  }

  function searchNextPage(e) {
    if (query === '') {
      alert('You must enter search query');
      return;
    }
    console.log(resultOffset);
    apiHandler
      .searchSpotify(query, 6, resultOffset, seedType)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
        setResultOffset(resultOffset + 6);
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
        <select value={seedType} onChange={(e) => setSeedType(e.target.value)}>
          <option value={'artist'}>Artist</option>
          <option value={'track'}>Track</option>
        </select>
        <button type='submit' onClick={searchNextPage}>
          More Results
        </button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {'artists' in searchResults
            ? searchResults.artists.items.map((x, index) => (
                <SearchResult
                  key={searchResults.artists.items[index].id}
                  result={searchResults.artists.items[index]}
                  seedSelection={seedSelection}
                  customOnClick={() =>
                    resultSelected(searchResults.artists.items[index].id)
                  }
                />
              ))
            : null}
          {'tracks' in searchResults
            ? searchResults.tracks.items.map((x, index) => (
                <SearchResult
                  key={searchResults.tracks.items[index].id}
                  result={searchResults.tracks.items[index]}
                  seedSelection={seedSelection}
                  customOnClick={() =>
                    resultSelected(searchResults.tracks.items[index].id)
                  }
                />
              ))
            : null}
        </div>
        <br />
        <Recommendations
          seedSelection={seedSelection}
          setRecommendationResults={setRecommendationResults}
        />
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
        <select value={seedType} onChange={(e) => setSeedType(e.target.value)}>
          <option value={'artist'}>Artist</option>
          <option value={'track'}>Track</option>
        </select>
      </>
    );
  }
}
