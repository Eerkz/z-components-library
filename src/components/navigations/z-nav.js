import "./z-navitem";

class ZNav extends HTMLElement {
    constructor() {
        super();
        
    }

    static get observedAttributes() {
        return [
            "navItems",
            "anchorClass",
            "unorderedListClass",
            "listClass"
        ];
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        const anchorClass = this.getAttribute("anchorClass") || "";
        const unorderedListClass = this.getAttribute("unorderedListClass") || "";
        const listClass = this.getAttribute("listClass") || "";
        let navItems = this.getAttribute("navItems");

        try {
            navItems = JSON.parse(navItems);
        } catch (e) {
            console.error("Invalid JSON format for navs");
            return;
        }
      
        navItems = Object.entries(navItems)
        .map(
            ([name, { href, active }]) =>
                `<z-navItem text="${name}" href="${href}" active=${active} anchorClass="${anchorClass}" listClass="${listClass}"></z-navItem>`
        )
        .join("");

        this.innerHTML = `
            <ul class="${unorderedListClass}">
                ${navItems}
            </ul>
        `;
    }
}

customElements.define("z-nav", ZNav);