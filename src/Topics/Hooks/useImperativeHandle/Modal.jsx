import React, { forwardRef, useImperativeHandle } from "react";
import { useRef } from "react";
const Modal = forwardRef((props, ref) => {
  const dialogRef = useRef();
  useImperativeHandle(ref,() => ({
    open: () => {
      dialogRef.current.showModal();
    },
    close: () => {
      dialogRef.current.close();
    }
  }));
  return (
    <dialog ref={dialogRef}>
      <h3>Dialog box</h3>
      <p>This is a modal</p>
    </dialog>
  );
});

export default Modal;
