"use client"

import React, { useEffect, useState } from 'react'
import {ThemeProvider} from "next-themes"

function ThemeContextProvider({children}) {
    const [mount, setMount] = useState(false) 

    useEffect(() => {
        setMount(() => true)
    }, [])
    
  return (
    <ThemeProvider attribute='class'>
        {children}
    </ThemeProvider>
  )
}

export default ThemeContextProvider