import { idGenerator } from "../../utils/idGenerator.js";
import "../logos/z-logo.js"

class ZHeader extends HTMLElement {
  constructor() {
    super();
    
  }

  // static get observedAttributes() {
  //   return [
  //     "logo",
  //   ];
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const logoAttributes = this.getAttribute("logo");
    let logo = {};
    let logoHTML = "";

    if (logoAttributes) {
      try {
        logo = JSON.parse(logoAttributes);
        const imageURL = logo.imageURL;
        const height = logo.height;
        const width = logo.width;
        const brand = logo.brand;
        logoHTML = `<z-logo class="d-flex align-items-center mb-3 mb-md-0 me-md-auto" imageURL="${imageURL}" height="${height}" width="${width}" brand="${brand}"></z-logo>`
      } catch (e) {
        console.error("Invalid JSON format for logo");
        return;
      }
    }

    this.innerHTML = `
      <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
          ${logoHTML}
          <ul class="nav nav-pills">
              <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
              <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
              <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
              <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
              <li class="nav-item"><a href="#" class="nav-link">About</a></li>
          </ul>
        </header>
      </div>
    `;
  }
}
  
customElements.define("z-header", ZHeader);
  