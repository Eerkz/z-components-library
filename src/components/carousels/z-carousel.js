import { idGenerator } from "../../utils/idGenerator.js";
import parseJSONAttribute from "../../utils/jsonParse.js";

class ZCarousel extends HTMLElement {
  constructor() {
    super();
    this.carouselId = this.id || idGenerator();
    this.attachStyles();
  }

  attachStyles() {
    const style = document.createElement("style");
    style.id = `${this.carouselId}-style`;
    style.textContent = `
      #${this.carouselId} .carousel-item img {
        height: ${this.height};
        width: 100%;
        object-fit: cover;
      }
    `;
    document.head.appendChild(style);
  }

  static get observedAttributes() {
    return [
      "data-images",
      "height",
      "indicators",
      "ride",
      "interval",
      "data-captions",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-images":
      case "indicators":
      case "ride":
      case "interval":
      case "data-captions":
        this.render();
        break;
      case "height":
        this.updateStyles();
        break;
      default:
        break;
    }
  }

  connectedCallback() {
    this.render();
  }

  getAttributeValue(attr, defaultValue = null) {
    return this.getAttribute(attr) || defaultValue;
  }

  get height() {
    return this.getAttributeValue("height", "600px");
  }

  get indicators() {
    return this.hasAttribute("indicators");
  }

  get ride() {
    return this.hasAttribute("ride");
  }

  get interval() {
    return this.getAttributeValue("interval", "5000");
  }

  get captions() {
    return parseJSONAttribute(this, "data-captions");
  }

  get images() {
    return parseJSONAttribute(this, "data-images");
  }

  updateStyles() {
    const style = document.getElementById(`${this.carouselId}-style`);
    if (style) {
      style.textContent = `
        #${this.carouselId} .carousel-item img {
          height: ${this.height};
          width: 100%;
          object-fit: cover;
        }
      `;
    }
  }

  render() {
    const images = this.images;
    if (!images.length) return;

    const captions = this.captions;
    const indicators = this.indicators ? this.renderIndicators(images.length) : '';
    const items = this.renderItems(images, captions);

    this.innerHTML = `
      <div id="${this.carouselId}" class="carousel slide" 
        ${this.ride ? 'data-bs-ride="carousel"' : ""}
        ${this.interval ? `data-bs-interval="${this.interval}"` : ""}>
        ${indicators}
        <div class="carousel-inner">${items}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${this.carouselId}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${this.carouselId}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`;
  }

  renderIndicators(length) {
    return `<div class="carousel-indicators">
      ${Array.from({ length }).map((_, i) => `
        <button type="button" data-bs-target="#${this.carouselId}" data-bs-slide-to="${i}" ${i === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${i + 1}"></button>
      `).join('')}
    </div>`;
  }

  renderItems(images, captions) {
    return images.map((src, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="${src}" class="d-block w-100" alt="Slide ${i + 1}">
        ${captions[i] ? `<div class="carousel-caption d-none d-md-block"><p>${captions[i]}</p></div>` : ""}
      </div>
    `).join('');
  }
}


customElements.define("z-carousel", ZCarousel);
