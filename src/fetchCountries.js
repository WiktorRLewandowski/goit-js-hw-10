export function fetchCountries(name) {

return fetch(name)
      .then(response => {
        if (!response.ok) {
          throw new Error(error);
        }
        return response.json();
      })
    }