class ZButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const type = this.getAttribute("type") || "primary";
    const label = this.getAttribute("label") || "Button";
    this.shadowRoot.innerHTML = `
          <style>
            @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
          </style>
          <button class="btn btn-${type}">${label}</button>
        `;
  }
}

customElements.define("z-button", ZButton);
