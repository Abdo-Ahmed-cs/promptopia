"use client"
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

function MyProfile() {
    const {data: session} = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    const handleEdit = async (post) => {
        router.push(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

      if (hasConfirmed) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/prompt/${post._id.toString()}`, {
            method: "DELETE",

          })

          const filterPosts = posts.filter(p => p._id !== post._id)
          setPosts(filterPosts)
        } catch (error) {
          console.log(error);
        }
      }
    }

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${session?.user.id}/posts`)
          const data = await response.json()
    
          setPosts(data)
        }
    
        if (session?.user.id) fetchPosts()
      }, [])
  return (
    <Profile
    name="My"
    desc="Welcome to my personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete} 
    />
  )
}

export default MyProfile