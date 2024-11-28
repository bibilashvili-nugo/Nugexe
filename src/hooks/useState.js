// src/hooks/useState.js
let state;
export function useState(initialValue) {
  state = state || initialValue;

  function setState(newValue) {
    state = newValue;
    renderApp();  // Trigger re-render when state changes (you can implement this logic)
  }

  return [state, setState];
}
