export function fetchJSON(...args) {
  return fetch(...args).then((response) => {
    if (!response.ok) {
      throw new Error("Fetch error: " + response);
    }
    return response.json();
  });
}

window.fetchJSON = fetchJSON;
