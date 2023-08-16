import { useState } from 'react';
import { Recommendations } from './recommendations';
import { ShowSearchResults } from './showSearchresults';
import { Selection } from './selection';
import { SearchAttribute } from './searchAttribute';
import apiHandler from '../services/myService';
import { isEmpty } from 'lodash';

export function Searcher() {
  const [searchResults, setSearchResults] = useState({});
  const [resultOffset, setResultOffset] = useState(0);
  const [query, setQuery] = useState('');
  const [seedSelection, setSeedSelection] = useState([]);
  const [seedType, setSeedType] = useState('artist');
  const [songAttributes, setSongAttributes] = useState({});

  function searchSubmit() {
    if (query === '') {
      alert('You must enter search query');
      return;
    }

    apiHandler
      .searchSpotify(query, 5, 0, seedType)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setSearchResults(data);
        // next offset is always reset to 5
        setResultOffset(5);
      })
      .catch((err) => console.log(err));
  }

  function searchNextPage() {
    if (query === '') {
      alert('You must enter search query');
      return;
    }
    console.log(resultOffset);
    apiHandler
      .searchSpotify(query, 5, resultOffset, seedType)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
        setResultOffset(resultOffset + 5);
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

  return (
    <>
      <h2>Search Spotify For Recommendation Seeds</h2>
      <p>Get recommendations based on seed artists or songs</p>
      <h3>Selections:</h3>
      <Selection
        seedSelection={seedSelection}
        customOnClick={removeFromSelection}
      />
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <select value={seedType} onChange={(e) => setSeedType(e.target.value)}>
          <option value={'artist'}>Artist</option>
          <option value={'track'}>Track</option>
        </select>
        <textarea
          rows={1}
          cols={40}
          name='queryBox'
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              searchSubmit();
            }
          }}
        />
        <button type='submit' onClick={searchSubmit}>
          Search
        </button>
      </div>
      <hr />
      {!isEmpty(searchResults) ? (
        <button type='submit' onClick={searchNextPage}>
          More Results
        </button>
      ) : null}
      <ShowSearchResults
        searchResults={searchResults}
        resultSelected={resultSelected}
      ></ShowSearchResults>
      <br />
      <div style={{ display: 'flex' }}>
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
      </div>
      <hr />
      <br />
      {!isEmpty(searchResults) ? (
        <Recommendations
          seedSelection={seedSelection}
          songAttributes={songAttributes}
        />
      ) : null}
    </>
  );
}
