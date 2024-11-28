// src/render.js
export function render(vNode, container) {
    if (typeof vNode === 'string' || typeof vNode === 'number') {
      container.appendChild(document.createTextNode(vNode));
      return;
    }
  
    const domElement = document.createElement(vNode.type);
  
    // Set props like className or event listeners
    for (const [key, value] of Object.entries(vNode.props || {})) {
      if (key.startsWith('on')) {
        const event = key.toLowerCase().substring(2);
        domElement.addEventListener(event, value);
      } else if (key !== 'children') {
        domElement[key] = value;
      }
    }
  
    // Recursively render children
    (vNode.props.children || []).forEach(child => render(child, domElement));
  
    container.appendChild(domElement);
  }
  