const URL = 'https://restcountries.com/v3.1/';
const fields = `?fields=name,capital,population,flags,languages`;

export function fetchCountries(name) {
  return fetch(`${URL}name/${name}${fields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
