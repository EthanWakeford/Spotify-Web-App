import { useState } from 'react';

export function Searcher() {
  const [searchResults, setSearchResults] = useState();

  // const [query, setQuery] = useState(
  //   'The content of a textarea goes in the value attribute'
  // );

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const query = e.target[0].value;

    if (query === '') {
      alert('You must enter search query');
      return;
    }

    fetch(
      '/api/searcher?' +
        new URLSearchParams({
          query: query,
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      });
  }

  if (searchResults) {
    return (
      <>
        <form method='get' onSubmit={handleSubmit}>
          <label>
            Search Spotify
            <br />
            <textarea defaultValue={''} rows={1} cols={40} name='queryBox' />
            <br />
          </label>
          <button type='submit'>Search</button>
        </form>
        <img
          src={searchResults.albums.items[0].images[1].url}
          alt={searchResults.albums.items[0].name}
        ></img>
        <h4>{searchResults.albums.items[0].name}</h4>
        <h6>{searchResults.albums.items[0].artists[0].name}</h6>
      </>
    );
  } else {
    return (
      <form method='get' onSubmit={handleSubmit}>
        <label>
          Search Spotify
          <br />
          <textarea defaultValue={''} rows={1} cols={40} name='queryBox' />
          <br />
        </label>
        <button type='submit'>Search</button>
      </form>
    );
  }
}
