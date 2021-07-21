const covid19apiUrl = 'https://covid19.mathdro.id/api';

const fetchUserCountry = () => fetch('https://extreme-ip-lookup.com/json/');

const fetchWorldSummary = () => fetch(covid19apiUrl);

const fetchCountries = () => fetch(`${covid19apiUrl}/countries`);

const fetchCountrySummary = (countryCode) => fetch(`${covid19apiUrl}/countries/${countryCode}`);

module.exports = {
  fetchCountrySummary,
  fetchWorldSummary,
  fetchCountries,
  fetchUserCountry,
};
