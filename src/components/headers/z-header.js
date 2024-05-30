import { idGenerator } from "../../utils/idGenerator.js";
import "../logos/z-logo.js";
import "../buttons/z-button.js";
import "../navigations/z-nav.js";

class ZHeader extends HTMLElement {
  constructor() {
    super();
    
  }

  static get observedAttributes() {
    return [
      "logo",
      "navigation",
      "headerClass"
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let imageURL;
    let height;
    let width;
    let brand;
    let navItems;
    let anchorClass;
    let unorderedListClass;
    let listClass;
    let logo = this.getAttribute("logo");
    let navigation = this.getAttribute("navigation");
    const headerClass = this.getAttribute("headerClass");
  
    if (logo) {
      try {
        logo = JSON.parse(logo);
        imageURL = logo.imageURL || "";
        height = logo.height || "";
        width = logo.width || "";
        brand = logo.brand || "";
      } catch (e) {
        console.error("Invalid JSON format for logo");
        return;
      }
    }

    if (navigation) {
      try {
        navigation = JSON.parse(navigation);
        navItems = JSON.stringify(navigation.navItems);
        anchorClass = navigation.anchorClass;
        unorderedListClass = navigation.unorderedListClass;
        listClass = navigation.listClass;
      } catch (e) {
        console.error("Invalid JSON format for navigation");
        return;
      }
    }

    this.innerHTML = `
      <div class="container">
        <header class="${headerClass}">
          ${logo ? `<z-logo class="d-flex align-items-center mb-3 mb-md-0 me-md-auto" imageURL="${imageURL}" height="${height}" width="${width}" brand="${brand}"></z-logo>` : ""}
          ${navigation ? `<z-nav navItems=${navItems} anchorClass=${anchorClass} unorderedListClass=${unorderedListClass} listClass=${listClass}></z-nav>` : ""}
        </header>
      </div>
    `;
  }
}
  
customElements.define("z-header", ZHeader);
  