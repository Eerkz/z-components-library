import { fetchConstructibleStyles } from "../../utils/cssLoader.js";
import { idGenerator } from "../../utils/idGenerator.js";

export class ZBadge extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.badge = this.createBadgeElement();
    this.anchor = this.createAnchorElement();
  }

  static get observedAttributes() {
    return [
      "variant",
      "id",
      "shape",
      "padding",
      "width",
      "height",
      "href",
      "target",
      "rel",
      "title",
      "color",
      "background",
      "icon-start",
      "icon-end"
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateAttribute(name, newValue);
      this.render();
    }
  }

  async connectedCallback() {
    const [bootstrap, icons] = await fetchConstructibleStyles();
    this.shadow.adoptedStyleSheets = [bootstrap, icons];
    this.render();
  }

  handleClick(e) {
    this.dispatchEvent(new CustomEvent("z-click"));
  }

  createBadgeElement() {
    const badge = document.createElement("badge");
    badge.id = idGenerator();
    if (!badge.classList.contains("badge")) {
      badge.classList.add("badge");
    }
    badge.addEventListener("click", (e) => this.handleClick(e));
    return badge;
  }

  createAnchorElement() {
    const anchor = document.createElement("a");
    anchor.id = idGenerator();
    anchor.classList.add("badge");
    anchor.setAttribute("role", "button");
    return anchor;
  }

  updateAttribute(name, value) {
    const element = this.isLinkVariant() ? this.anchor : this.badge;
    switch (name) {
      case "id":
        element.id = `${element.id} ${value}`;
        break;
      case "variant":
        element.classList.add(`text-bg-${value}`);
        break;
      case "shape":
        this.updateShape(element, value);
        break;
      case "padding":
        element.style.padding = value;
        break;
      case "width":
        this.updateWidth(element, value);
        break;
      case "height":
        element.style.height = value;
        break;
      case "color":
        element.style.color = value;
        break;
      case "background":
        element.style.backgroundColor=value;
      case "href":
        if (this.isLinkVariant()) {
          this.anchor.href = value;
        }
        break;
      case "target":
      case "rel":
      case "title":
        if (this.isLinkVariant()) {
          element.setAttribute(name, value);
        }
        break;
      case "icon-start":
      case "icon-end":
        this.render();
        break;
    }
  }

  updateShape(element, shape) {
    element.classList.remove(
      "rounded-pill",
      "rounded-circle",
      "square",
      "rounded"
    );
    switch (shape) {
      case "rounded-pill":
        element.classList.add("rounded-pill");
        break;
      case "rounded":
        element.classList.add("rounded-circle");
        break;
      case "square":
        element.classList.add("square");
        break;
      case "rounded-square":
      default:
        element.classList.add("rounded");
        break;
    }
  }

  updateWidth(element, width) {
    if (width === "full") {
      element.style.width = "100%";
    } else {
      element.style.width = width;
    }
  }

  isLinkVariant() {
    return this.getAttribute("variant") === "link";
  }

  render() {
    const content = this.innerHTML.trim();
    const iconStartClass = this.getAttribute("icon-start");
    const iconEndClass = this.getAttribute("icon-end");
    const element = this.isLinkVariant() ? this.anchor : this.badge;


    element.style.font = "inherit";
    element.innerHTML = `
      ${iconStartClass ? `<i class="${iconStartClass}"></i>` : ""}
      ${content}
      ${iconEndClass ? `<i class="${iconEndClass}"></i>` : ""}
    `;

    this.shadow.innerHTML = "";
    this.shadow.appendChild(element);
  }
}

customElements.define("z-badge", ZBadge);
