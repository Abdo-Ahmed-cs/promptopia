"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from "next-auth/react"
import dynamic from 'next/dynamic'

const Button =  dynamic(() => import('./ThemeButton', {ssr: false})) 
function Nav() {
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }

    setUpProviders()
  }, [])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={"/"} className='flex gap-2 flex-center'>
        <Image 
        width={30} 
        height={30} 
        alt='Promptopia Logo' 
        className='object-contain' 
        src={"/assets/images/logo.svg"}
        />
        <p className='logo_text dark:text-white'>Promptopia</p>
      </Link>

      {/* Desktop navigation */}

      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gao-3 md:gap-5'>
            <Link href={"/create-prompt"} className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href={"/profile"}>
              <Image 
              src={session?.user.image} 
              width={37} 
              height={37} 
              alt='profile' 
              className='rounded-full'
              />
            </Link>
            <Button />
          </div>
        ) :
        <>
          <div className='flex gao-2 md:gap-5'>
            {providers && Object.values(providers).map((provider) => (
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                signIn
              </button>
            ))}
            <Button />
          </div>
        </>
        }
      </div>
        {/* mobile navigation */}

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image 
            src={session?.user.image} 
            width={37} 
            height={37} 
            alt='profile' 
            className='rounded-full'
            onClick={() => {setToggleDropDown((prev) => !prev)}}
            />
            {toggleDropDown && (
              <div className='dropdown'>
                <Button />
                <Link 
                href={"/profile"} 
                className='dropdown_link' 
                onClick={() => setToggleDropDown(() => false)}
                >
                  My Profile
                </Link>
                <Link 
                href={"/create-prompt"} 
                className='dropdown_link' 
                onClick={() => setToggleDropDown(() => false)}
                >
                  Create Prompt
                </Link>
                <button 
                type='button'
                className='mt-5 w-full black_btn'
                onClick={() => {
                setToggleDropDown(false);
                signOut();}}
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        ): (
          <>
          <Button />
          {providers && Object.values(providers).map((provider) => (
            <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
              signIn
            </button>
          ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav