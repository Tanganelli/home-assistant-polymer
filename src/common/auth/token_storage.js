const storage = window.localStorage || {};

// So that core.js and main app hit same shared object.
let tokenCache = window.__tokenCache;
if (!tokenCache) {
  tokenCache = window.__tokenCache = {
    tokens: undefined,
    writeEnabled: undefined,
  };
}

export function askWrite() {
  return tokenCache.tokens !== undefined && tokenCache.writeEnabled === undefined;
}

export function storeTokens(tokens) {
  tokenCache.tokens = tokens;
  if (tokenCache.writeEnabled) {
    try {
      storage.tokens = JSON.stringify(tokens);
    } catch (err) {}  // eslint-disable-line
  }
}

export function enableWrite() {
  tokenCache.writeEnabled = true;
  storeTokens(tokenCache.tokens);
}

export function loadTokens() {
  if (tokenCache.tokens === undefined) {
    try {
      const tokens = storage.tokens;
      if (tokens) {
        tokenCache.tokens = JSON.parse(tokens);
        tokenCache.writeEnabled = true;
      } else {
        tokenCache.tokens = null;
      }
    } catch (err) {
      tokenCache.tokens = null;
    }
  }
  return tokenCache.tokens;
}
