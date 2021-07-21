const {
  fetchWorldSummary,
  fetchCountrySummary,
  fetchCountries,
  fetchUserCountry,
} = require('./script/ajax');

const { displayDate } = require('./script/utils');

class MainApp extends HTMLElement {
  constructor() {
    super();

    this.state = {
      loading: true,
      userCountryCode: null,
      selectedCountryCode: null,
      selectedCountryName: null,
      lastUpdated: null,
      countries: [],
      globalCases: 0,
      globalRecovered: 0,
      globalDeaths: 0,
      countryCases: 0,
      countryRecovered: 0,
      countryDeaths: 0,
    };

    const fetchDatas = async () => {
      let countryCode;

      await Promise.all([
        fetchUserCountry().then((res) => res.json()).then((data) => {
          countryCode = data.countryCode.toLowerCase();

          this.setState({
            userCountryCode: countryCode,
            selectedCountryCode: countryCode,
            selectedCountryName: data.country,
          });
        }),
        fetchCountries().then((res) => res.json()).then((data) => {
          this.setState({
            countries: data.countries.filter((country) => country.iso2),
          });
        }),
        fetchWorldSummary().then((res) => res.json()).then((data) => {
          this.setState({
            globalCases: data.confirmed.value,
            globalRecovered: data.recovered.value,
            globalDeaths: data.deaths.value,
            lastUpdated: new Date(data.lastUpdate),
          });
        }),
      ]);

      await Promise.all([
        fetchCountrySummary(countryCode).then((res) => res.json()).then((data) => {
          this.setState({
            countryCases: data.confirmed.value,
            countryRecovered: data.recovered.value,
            countryDeaths: data.deaths.value,
          });
        }),
      ]);
    };

    fetchDatas().then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { loading } = { ...this.state };

    if (loading) {
      this.innerHTML = `
        <div
          class="bg-gray-900 text-white min-h-screen"
        >
          <p>Loading...</p>
        </div>
      `;
    } else {
      const {
        selectedCountryCode,
        globalCases,
        globalRecovered,
        globalDeaths,
        lastUpdated,
        selectedCountryName,
        countryCases,
        countryRecovered,
        countryDeaths,
        countries,
      } = { ...this.state };

      const handleSelectCountryChange = (countryCode, countryName) => {
        fetchCountrySummary(countryCode).then((res) => res.json()).then((data) => {
          this.setState({
            selectedCountryCode: countryCode,
            selectedCountryName: countryName,
            countryCases: data.confirmed.value,
            countryRecovered: data.recovered.value,
            countryDeaths: data.deaths.value,
          });
        });
      };

      this.innerHTML = `
        <div
          class="bg-gray-900 text-white min-h-screen min-w-full"
        >
          <app-bar
            title="Covid-19 Statistic"
          ></app-bar>

          <div
            class="p-4"
          >
            ${selectedCountryCode ? (`
              <img 
                src="https://www.countryflags.io/${selectedCountryCode}/flat/64.png"
                class="mx-auto md:mx-0"
              >
            `) : ''}

            <div
              class="flex flex-wrap"
            >
              <div
                class="w-full md:w-1/2 mt-4"
              >
                <stat-card
                  location="${selectedCountryName}"
                  confirmed=${countryCases}
                  recovered=${countryRecovered}
                  death=${countryDeaths}
                ></stat-card>
              </div>

              <div
                class="w-full md:w-1/2 mt-4"
              >
                <stat-card
                  location="Global"
                  confirmed=${globalCases}
                  recovered=${globalRecovered}
                  death=${globalDeaths}
                ></stat-card>
              </div>
            </div>

            <p
              class="mt-4"
            >
              Last updated at: 
              <span
                class="font-bold"
              >
                ${displayDate(lastUpdated)}
              </span>
            </p>
          </div>
        </div>
        <footer-section>
        </footer-section>
      `;

      document.querySelector('app-bar').init(selectedCountryCode, countries, handleSelectCountryChange);
    }
  }
}

customElements.define('main-app', MainApp);
