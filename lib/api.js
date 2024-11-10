export async function fetchFromSwapi(endpoint) {
  const res = await fetch(`https://swapi.dev/api/${endpoint}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}
export async function fetchImageFromSWVisualGuide(endpoint) {
  const res = await fetch(
    `https://starwars-visualguide.com/assets/img/${endpoint}.jpg`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch image");
  }
  return res.url; 
}
export async function getHomeworld(endpoint) {
  const res = await fetch(`${endpoint}`);
  console.log(res);
  console.log(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch homeworld");
  }
  return await res.json();
}
