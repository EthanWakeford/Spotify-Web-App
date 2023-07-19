export function SearchResult({ result, customOnClick }) {
  return (
    <div style={{ margin: '0 20px', width: '20%', maxWidth: '200px' }} onClick={customOnClick}>
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

export function RecommendationResult({ result }) {
  return (
    <div>
      <h4>{result.name}: {result.artists[0].name}</h4>
    </div>
  );
}
