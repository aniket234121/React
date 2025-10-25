# Portals

eact Portals allow you to render a component outside of its parent DOM hierarchy while still preserving React state and event system.

```javascript
import { createPortal } from "react-dom";

const Modal = () => {
  return createPortal(
    <div className="modal">Hello from Portal</div>,
    document.getElementById("portal-root")
  );
};
```

## use cases

- To render modals, popups, tooltips outside overflow/parent restrictions
- Avoid CSS z-index and stacking issues
- Still maintain React event bubbling and state
