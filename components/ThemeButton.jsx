"use client"
import React, {useState, useEffect} from 'react'
import { useTheme } from 'next-themes'
import {IconButton} from "@mui/material"
import {LightMode, Nightlight} from "@mui/icons-material"

function ThemeButton() {
    const [mount, setMount] = useState(false) 
    const {theme, setTheme, systemTheme} = useTheme()

    useEffect(() => {
        setMount(() => true)
    }, [])
  return (
    <>
      {theme === 'light'? 
      <IconButton disableRipple onClick={() => setTheme('dark')}><LightMode/></IconButton> 
      : 
      <IconButton disableRipple onClick={() => setTheme('light')}><Nightlight sx={{color: 'white', transform: 'rotateZ(-45deg) translateY(2px)'}}/></IconButton>}
    </>
  )
}

export default ThemeButton