import { renderNumber } from '../utils';

class StatCard extends HTMLElement {
  constructor() {
    super();

    this.location = this.getAttribute('location') || null;
    this.confirmed = this.getAttribute('confirmed') || null;
    this.recovered = this.getAttribute('recovered') || null;
    this.death = this.getAttribute('death') || null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <h2
        class="text-2xl break-words"
      >
        ${this.location} Cases :
      </h2>

      <div
        class="mt-4"
      >
        <div
          class="mt-2 text-center md:text-left"
        >
          <p
            class="text-5xl break-words"
          >
            ${renderNumber(this.confirmed)}
          </p>

          <p
          >
            Confirmed
          </p>
        </div>

        <div
          class="mt-2 text-green-400 text-center md:text-left"
        >
          <p
            class="text-5xl break-words"
          >
            ${renderNumber(this.recovered)}
          </p>

          <p
          >
            Recovered
          </p>
        </div>

        <div
          class="mt-2 text-red-400 text-center md:text-left"
        >
          <p
            class="text-5xl break-words"
          >
            ${renderNumber(this.death)}
          </p>

          <p
          >
            Death
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('stat-card', StatCard);
