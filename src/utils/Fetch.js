export function fetchUrl(url) {
  return fetch(url)
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
