export default function parseJSONAttribute(element, attr, defaultValue = []) {
    const value = element.getAttribute(attr);
    if (!value) return defaultValue;
  
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error(`Invalid JSON format for ${attr}`, e);
      return defaultValue;
    }
  }
  