# useImperativeHandle

- useImperativeHandle is a React hook that allows a component to customize the value exposed to a parent component when using a ref.

- It is commonly used with forwardRef.

- Purpose: Encapsulate internal implementation while exposing only specific methods or properties to the parent.

#### When you want the parent to interact imperatively with a child component.

- Avoid direct access to the DOM node or state.

## Steps

- wrap child components with the forwardRef to take a ref from parent component to child component.

- useImperativeHandle(ref,()=>({})) use this hook to define the methods or properties to access from parent using the ref

- create a ref and attach the ref to the whichever dom element you want

```javascript
//Parent component passing and using the ref
const UseImperativeHandle = () => {
  const Ref = useRef();

  return (
    <div>
      <button onClick={() => Ref.current.open()}>open ref</button>
      <Modal></Modal>
    </div>
  );
};

//------------------------

//child component taking the ref through forward ref

const Modal = forwardRef((props, ref) => {
  // creating the ref and attach to the dialog element
  const dialogRef = useRef();

  //defining the useImperativeHandle hook methods to access from parent
  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
    },
    close: () => {
      dialogRef.current.close();
    },
  }));
  return (
    <dialog ref={dialogRef}>
      <h3>Dialog box</h3>
      <p>This is a modal</p>
    </dialog>
  );
});
```
