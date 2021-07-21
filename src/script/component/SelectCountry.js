class SelectCountry extends HTMLElement {
  init(defaultValue, countries, handleChange) {
    this.defaultValue = defaultValue.toLowerCase();
    this.countries = countries;
    this.handleChange = handleChange;
    this.render();
  }

  render() {
    this.innerHTML = (`
      <div
        class="p-3 bg-gray-900 rounded-xl"
      >
        <select
          class="text-base input-select bg-gray-900 text-white w-full"
          placeholder="Select Country"
        >
        </select>
      </div>
    `);

    const select = document.querySelector('select');
    select.onchange = () => {
      this.handleChange(
        select.value,
        this.countries.filter((country) => country.iso2.toLowerCase() === select.value)[0].name,
      );
    };

    this.countries.forEach((country) => {
      const countryCode = country.iso2.toLowerCase();
      const option = document.createElement('option');
      option.innerHTML = country.name;
      option.setAttribute('value', countryCode);

      if (countryCode === this.defaultValue) {
        option.setAttribute('selected', '');
      }

      select.appendChild(option);
    });
  }
}

customElements.define('select-country', SelectCountry);
