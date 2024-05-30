class ZNavItem extends HTMLElement {
  constructor() {
    super();
      
  }

  static get observedAttributes() {
    return [
      "text",
      "href",
      "active",
      "anchorClass",
      "listClass"
    ];
  }

  connectedCallback() {
    this.render();
  }
  
  render() {
    const textContent = this.getAttribute("text") || "";
    const href = this.getAttribute("href") || "#";
    const active = this.getAttribute("active");
    const anchorClass = this.getAttribute("anchorClass") || "";
    const listClass = this.getAttribute("listClass") || "";

    this.innerHTML = `
      <li class=${listClass}>
        <a href="${href}" class='${anchorClass} ${active === "true" ? "active": ""}'>
          ${textContent}
        </a>
      </li>
    `;
  }
}

customElements.define("z-navitem", ZNavItem);