function LS() {
  const storage = {};
  return {
    getItem: function getItem(key) {
      return storage[key];
    },
    setItem: function setItem(key, value) {
      storage[key] = value;
    },
  };
}
if (!('window' in global)) {
  global.window = {};
}

if (!('localStorage' in window)) {
  Object.defineProperty(global, 'localStorage', {
    value: LS(),
  });
}
