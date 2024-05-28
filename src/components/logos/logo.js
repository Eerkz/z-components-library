class ZLogo extends HTMLElement {
    constructor() {
      super();
      
    }
  
    static get observedAttributes() {
      return [
        "imageURL",
        "width",
        "height",
        "brand"
      ];
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const imageURL = this.getAttribute("imageURL");
      const height = this.getAttribute("height");
      const width = this.getAttribute("width");
      const brand = this.getAttribute("brand");
  
      this.innerHTML = `
          ${imageURL ? 
          `
          <a href="/" class="link-body-emphasis text-decoration-none">
            <img class="shadow" src="${imageURL}" width="${width}" height="${height}" style="border-radius: 5px" alt="Logo">
            ${brand ? `<span class="fs-4">${brand}</span>` : ""}
          </a>
          ` : ""}`;
    }
  }
  
  customElements.define("z-logo", ZLogo);