import { useState } from 'react';
import { Recommendations } from './recommendations';
import { SearchResult, RecommendationResult } from './results';
import { Selection } from './selection';
import { SearchAttribute } from './searchAttribute';
import { CreatePlaylist } from './createPlaylist';
import apiHandler from '../services/myService';

export function Searcher() {
  const [searchResults, setSearchResults] = useState();
  const [resultOffset, setResultOffset] = useState(0);
  const [query, setQuery] = useState('');
  const [seedSelection, setSeedSelection] = useState([]);
  const [recommendationResults, setRecommendationResults] = useState();
  const [seedType, setSeedType] = useState('artist');
  const [songAttributes, setSongAttributes] = useState({});

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

  function resultSelected(result, type) {
    if (seedSelection.some((x) => x.id === result.id)) {
      removeFromSelection(result);
    } else {
      setSeedSelection([
        ...seedSelection,
        {
          id: result.id,
          name: result.name,
          type: type,
        },
      ]);
    }
  }

  function removeFromSelection(result) {
    setSeedSelection(seedSelection.filter((x) => x.id !== result.id));
  }

  if (searchResults) {
    return (
      <>
        <h2>Search Spotify For Recommendation Seeds</h2>
        <h3>Selections:</h3>
        <Selection
          seedSelection={seedSelection}
          customOnClick={removeFromSelection}
        />
        <br />
        <textarea
          rows={1}
          cols={40}
          name='queryBox'
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchSubmit();
            }
          }}
        />
        <hr />
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
                    resultSelected(searchResults.artists.items[index], 'artist')
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
                    resultSelected(searchResults.tracks.items[index], 'track')
                  }
                />
              ))
            : null}
        </div>
        <br />
        {[
          'acousticness',
          'dancability',
          'energy',
          'instrumentalness',
          'liveness',
          'speechiness',
          'valence',
        ].map((type) => (
          <SearchAttribute
            key={type}
            attributeType={type}
            songAttributes={songAttributes}
            setSongAttributes={setSongAttributes}
          ></SearchAttribute>
        ))}
        <hr />
        <br></br>
        <Recommendations
          seedSelection={seedSelection}
          setRecommendationResults={setRecommendationResults}
          songAttributes={songAttributes}
        />
        <CreatePlaylist recommendationResults={recommendationResults}></CreatePlaylist>
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
        <h2>Search Spotify For Recommendation Seeds</h2>
        <br />
        <textarea
          defaultValue={''}
          rows={1}
          cols={40}
          name='queryBox'
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchSubmit();
            }
          }}
        />
        <br />
        <button type='submit' onClick={searchSubmit}>
          Search
        </button>
        <select value={seedType} onChange={(e) => setSeedType(e.target.value)}>
          <option value={'artist'}>Artist</option>
          <option value={'track'}>Track</option>
        </select>
        <br></br>
        <hr></hr>
        {[
          'acousticness',
          'dancability',
          'energy',
          'instrumentalness',
          'liveness',
          'speechiness',
          'valence',
        ].map((type) => (
          <SearchAttribute
            key={type}
            attributeType={type}
            songAttributes={songAttributes}
            setSongAttributes={setSongAttributes}
          ></SearchAttribute>
        ))}
        <hr></hr>
        <br></br>
        <Recommendations
          seedSelection={seedSelection}
          setRecommendationResults={setRecommendationResults}
          songAttributes={songAttributes}
        />
      </>
    );
  }
}
