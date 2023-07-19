export function Selection({ seedSelection, customOnClick }) {
  if (seedSelection) {
    return (
      <ul>
        {seedSelection.map((seed) => (
          <li key={seed.id} onClick={() => customOnClick(seed)}>
            {seed.name}{' '}
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
