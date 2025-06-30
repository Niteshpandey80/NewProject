import React, { createContext } from 'react'

const authContext = createContext()

const ContextProvider = () => {
  return (
    <authContext.Provider value={{}}>
        context
    </authContext.Provider>
  )
}

export default ContextProvider
