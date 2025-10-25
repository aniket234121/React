import React from "react";
import { useRef } from "react";
import Modal from "./Modal";
const UseImperativeHandle = () => {
  const Ref = useRef();

  return <div>
    <button  onClick={()=>Ref.current.open()}>open ref</button>
    <Modal></Modal>
  </div>;
};

export default UseImperativeHandle;
