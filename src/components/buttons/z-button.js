import { fetchConstructibleStyles } from "../../utils/cssLoader.js";
import { idGenerator } from "../../utils/idGenerator.js";

export class ZButton extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.button = this.createButtonElement();
    this.anchor = this.createAnchorElement();
  }

  static get observedAttributes() {
    return [
      "text",
      "variant",
      "disabled",
      "size",
      "id",
      "shape",
      "padding",
      "width",
      "height",
      "font-size",
      "href",
      "target", 
      "rel",
      "title",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateAttribute(name, newValue);
      this.render();
    }
  }

  async connectedCallback() {
    const styles = await fetchConstructibleStyles();
    this.shadow.adoptedStyleSheets = styles
    this.render();
  }

  handleClick(e) {
    if (this.hasAttribute("disabled")) {
      e.preventDefault();
      return;
    }
    this.dispatchEvent(new CustomEvent("z-click"));
  }

  createButtonElement() {
    const button = document.createElement("button");
    button.id = idGenerator();
    button.classList.add("btn");
    button.addEventListener("click", (e) => this.handleClick(e));
    return button;
  }

  createAnchorElement() {
    const anchor = document.createElement("a");
    anchor.id = idGenerator();
    anchor.classList.add("btn");
    anchor.setAttribute("role", "button");
    return anchor;
  }

  updateAttribute(name, value) {
    const element = this.isLinkVariant() ? this.anchor : this.button;
    switch (name) {
      case "id":
        element.id = `${element.id} ${value}`;
        break;
      case "text":
        element.textContent = value;
        break;
      case "variant":
        element.className = `btn btn-${value}`;
        break;
      case "disabled":
        this.updateDisabledState(element, value);
        break;
      case "size":
        this.updateSize(element, value);
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
      case "font-size":
        element.style.fontSize = value;
        break;
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

  updateDisabledState(element, value) {
    if (this.isLinkVariant()) {
      if (value !== null) {
        element.setAttribute("aria-disabled", "true");
        element.classList.add("disabled");
      } else {
        element.removeAttribute("aria-disabled");
        element.classList.remove("disabled");
      }
    } else {
      element.disabled = value !== null;
    }
  }

  updateSize(element, size) {
    element.classList.remove("btn-sm", "btn-lg");
    if (size) {
      element.classList.add(`btn-${size}`);
    }
  }

  updateShape(element, shape) {
    element.classList.remove("rounded-pill", "rounded-circle", "square", "rounded");
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
    const element = this.isLinkVariant() ? this.anchor : this.button;

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

customElements.define("z-button", ZButton);

