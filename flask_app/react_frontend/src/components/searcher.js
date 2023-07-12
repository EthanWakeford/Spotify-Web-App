import { useState } from 'react';
import apiHandler from '../services/myService';

export function Searcher() {
  const [searchResults, setSearchResults] = useState();
  const [resultOffset, setResultOffset] = useState(0);
  const [query, setQuery] = useState('');

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
    console.log(resultOffset)
    apiHandler
      .searchSpotify(query, 4, resultOffset)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
        setResultOffset(resultOffset + 4);
      });
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
        <button type='submit' onClick={searchNextPage}>More Results</button>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <SearchResult result={searchResults.albums.items[0]} />
          <SearchResult result={searchResults.albums.items[1]} />
          <SearchResult result={searchResults.albums.items[2]} />
          <SearchResult result={searchResults.albums.items[3]} />
        </div>
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

function SearchResult({ result }) {
  return (
    <div style={{margin: '0 20px'}}>
      <img src={result.images[1].url} alt={result.name}></img>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h4>{result.name}</h4>
        <h6>{result.artists[0].name}</h6>
      </div>
    </div>
  );
}
