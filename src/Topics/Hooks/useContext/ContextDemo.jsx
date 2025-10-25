import React from 'react'
import { FirstContextProvider } from '../../../Store/FirstContext'
import UseContextConsumer from './UseContextConsumer'
const ContextDemo = () => {
  return (
    <FirstContextProvider>
        <UseContextConsumer></UseContextConsumer>
    </FirstContextProvider>
  )
}

export default ContextDemo