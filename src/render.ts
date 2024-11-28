import { VNode } from "./types";

let rootContainer: HTMLElement | null = null;

function createDomNode(vNode: VNode | string): HTMLElement | Text {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  const element = document.createElement(vNode.type as string);

  // Apply properties
  Object.entries(vNode.props || {}).forEach(([key, value]) => {
    if (key === "children") return;
    if (key.startsWith("on")) {
      const eventName = key.toLowerCase().substring(2);
      element.addEventListener(eventName, value);
    } else {
      (element as any)[key] = value;
    }
  });

  // Render children
  (vNode.props.children || []).forEach((child: VNode | string) =>
    element.appendChild(createDomNode(child))
  );

  return element;
}

export function render(vNode: VNode, container: HTMLElement): void {
  rootContainer = container;
  container.innerHTML = ""; // Clear container
  container.appendChild(createDomNode(vNode));
}
