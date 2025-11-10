import React, { useEffect } from 'react'
import { useState } from 'react'
const useCustom = (title) => {

  const[DocumentTitle ,setDocumentTitle]=useState(title)
  useEffect(()=>{
    document.title=DocumentTitle
  })
  return [DocumentTitle,setDocumentTitle]
}

export default useCustom