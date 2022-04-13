// export function fetchJSON(...args) {
//   return fetch(...args).then((response) => {
//     if (!response.ok) {
//       throw new Error("Fetch error: " + response);
//     }
//     return response.json();
//   });
// }
export async function fetchJSON(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error("Fetch error: " + response);
  }
  return await response.json();
}

window.fetchJSON = fetchJSON;
