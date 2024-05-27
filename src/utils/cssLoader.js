export async function loadCSS(url) {
    const response = await fetch(url);
    const cssText = await response.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);
    return styleSheet;
  }
  
  export async function fetchConstructibleStyles() {
    return Promise.all([
      loadCSS(
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      ),
      loadCSS(
        "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"
      ),
    ]);
  }
  