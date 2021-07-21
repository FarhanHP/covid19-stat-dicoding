class FooterSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer
        class="text-white bg-gray-800 p-2"
      >
        &copy; 2021 FarhanHP
      </footer>
    `;
  }
}

customElements.define('footer-section', FooterSection);
