import useState from 'react';

export function SearchParameter({ songAttributes, setSongAttributes }) {
  return (
    <select
      onChange={(e) => {
        if (e.target.value === '') {
          // copies object without target_energy k,v pair and sets state
          // JS IIFE (immediately invoked function expression)
          // anon function destructures obj, returns without key, call immediately
          setSongAttributes((({ target_energy, ...o }) => o)(songAttributes));
        } else {
          setSongAttributes({
            ...songAttributes,
            target_energy: e.target.value,
          });
        }
      }}
    >
      <option value={''}>Energy</option>
      {[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((x) => (
        <option key={x} value={x}>
          {x}
        </option>
      ))}
    </select>
  );
}
