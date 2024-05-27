import { fetchConstructibleStyles } from "../../utils/cssLoader.js";
import { idGenerator } from "../../utils/idGenerator.js";

export class ZShadowButton extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.button = document.createElement("button");
    this.button.id = idGenerator();
    this.button.classList.add("btn");
    this.button.addEventListener("click", () => this.handleClick());
  }

  static get observedAttributes() {
    return [
      "text",
      "variant",
      "disabled",
      "color",
      "size",
      "icon-start",
      "icon-end",
      "id",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "id") {
        this.button.id = `${this.button.id} ${newValue}`;
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  async connectedCallback() {
    const [bootstrap, icons] = await fetchConstructibleStyles()
    this.shadow.adoptedStyleSheets = [bootstrap, icons];
    this.render();
  }

  render() {
    const textContent = this.getAttribute("text") || "";
    const variant = this.getAttribute("variant") || "primary";
    const disabled = this.hasAttribute("disabled");
    const size = this.getAttribute("size");
    const iconStartClass = this.getAttribute("icon-start");
    const iconEndClass = this.getAttribute("icon-end");

    this.button.className = `btn btn-${variant}`;
    if (size) {
      this.button.classList.add(`btn-${size}`);
    }
    this.button.disabled = disabled;

    this.button.innerHTML = `
      ${iconStartClass ? `<i class="${iconStartClass}"></i>` : ""}
      ${textContent}
      ${iconEndClass ? `<i class="${iconEndClass}"></i>` : ""}
    `;

    this.shadow.innerHTML = "";
    this.shadow.appendChild(this.button);
  }
}

customElements.define("z-button", ZShadowButton);