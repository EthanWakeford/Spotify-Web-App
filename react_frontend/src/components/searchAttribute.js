export function SearchAttribute({
  attributeType,
  songAttributes,
  setSongAttributes,
}) {
  function handleSelectChange(e) {
    const api_target = `target_${attributeType}`;
    if (e.target.value === '') {
      const tempAttributes = { ...songAttributes };
      delete tempAttributes[api_target];
      setSongAttributes({ ...tempAttributes });
    } else {
      setSongAttributes({
        ...songAttributes,
        [api_target]: e.target.value,
      });
    }
  }

  return (
    <label>
      {`Track ${attributeType[0].toUpperCase() + attributeType.slice(1)}:`}
      <select onChange={handleSelectChange}>
        <option value={''}>N/A</option>
        {[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
    </label>
  );
}
