import PropTypes from 'prop-types';

export function ShowSearchResults({ searchResults, resultSelected }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {'artists' in searchResults
        ? searchResults.artists.items.map((x, index) => (
            <Result
              key={searchResults.artists.items[index].id}
              result={searchResults.artists.items[index]}
              customOnClick={() =>
                resultSelected(searchResults.artists.items[index], 'artist')
              }
            />
          ))
        : null}
      {'tracks' in searchResults
        ? searchResults.tracks.items.map((x, index) => (
            <Result
              key={searchResults.tracks.items[index].id}
              result={searchResults.tracks.items[index]}
              customOnClick={() =>
                resultSelected(searchResults.tracks.items[index], 'track')
              }
            />
          ))
        : null}
    </div>
  );
}

ShowSearchResults.propTypes = {
  searchResults: PropTypes.object,
  resultSelected: PropTypes.func,
};

function Result({ result, customOnClick }) {
  return (
    <div
      style={{ margin: '0 20px', width: '20%', maxWidth: '200px' }}
      onClick={customOnClick}
    >
      {'images' in result && result.images.length > 0 ? (
        <img
          style={{ width: '10em' }}
          src={result.images[0].url}
          alt={result.name}
        ></img>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>{result.name}</h4>
        {'artists' in result ? <h6>{result.artists[0].name}</h6> : null}
      </div>
    </div>
  );
}

Result.propTypes = {
  result: PropTypes.object,
  customOnClick: PropTypes.func,
};
