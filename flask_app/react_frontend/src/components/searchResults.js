export function SearchResult({ result, customOnClick }) {
  return (
    <div style={{ margin: '0 20px' }} onClick={customOnClick}>
      <img src={result.images[1].url} alt={result.name}></img>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>{result.name}</h4>
        {/* <h6>{result.artists[0].name}</h6> */}
      </div>
    </div>
  );
}

export function RecommendationResult({result}) {
  return (
    <div>
        <h4>{result.name}</h4>
    </div>
  );
}
