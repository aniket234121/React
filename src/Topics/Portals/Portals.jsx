import React from 'react'
import { createPortal } from 'react-dom'

const Portals = () => {
  return createPortal(
    <div>
        <h2>Portal </h2>
        <p>this is code from portal</p>
    </div>,document.getElementsByClassName('portal-code')
  )
}

export default Portals