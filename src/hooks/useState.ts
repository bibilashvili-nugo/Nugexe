type StateSetter<T> = (value: T | ((prev: T) => T)) => void;

let currentState: any;
let stateUpdateCallback: () => void;

export function useState<T>(initialValue: T): [T, StateSetter<T>] {
  currentState = currentState || initialValue;

  const setState: StateSetter<T> = (value) => {
    currentState =
      typeof value === "function" ? (value as Function)(currentState) : value;
    if (stateUpdateCallback) stateUpdateCallback();
  };

  return [currentState, setState];
}

export function setRenderCallback(callback: () => void) {
  stateUpdateCallback = callback;
}
