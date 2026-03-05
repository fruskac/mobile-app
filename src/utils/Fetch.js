const DEFAULT_TIMEOUT_MS = 10000;

function timeoutPromise(timeoutMs) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), timeoutMs);
  });
}

export function fetchUrl(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
  return Promise.race([fetch(url), timeoutPromise(timeoutMs)])
    .then(statusHelper)
    .then(response => response.json())
    .catch(error => Promise.resolve(error))
    .then(data => {
      return data;
    });
}

function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
