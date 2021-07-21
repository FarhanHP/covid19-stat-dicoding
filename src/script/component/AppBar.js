class AppBar extends HTMLElement {
  init(selectedCountry, countries, onSelectCountryChange) {
    this.title = this.getAttribute('title') || null;
    this.selectedCountry = selectedCountry;
    this.countries = countries;
    this.onSelectCountryChange = onSelectCountryChange;

    this.render();
  }

  render() {
    this.innerHTML = `
      <div
        class="p-4 bg-gray-800 flex flex-wrap"
      >
        <div
          class="w-full md:w-1/2"
        >
          <h1
            class="text-4xl"
          >
            ${this.title}
          </h1>
        </div>

        <div
          class="pt-4 md:pt-0 w-full md:w-1/2 flex flex-wrap flex-row-reverse"
        >
          <div
            class="w-full lg:w-1/2"
          >
            <select-country></select-country>
          </div>
        </div>
      </div>
    `;

    document.querySelector('select-country').init(this.selectedCountry, this.countries, this.onSelectCountryChange);
  }
}

customElements.define('app-bar', AppBar);
