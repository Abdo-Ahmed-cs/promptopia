"use client"
import React, {useState, useEffect} from 'react'
import Profile from '@components/Profile'

function MyProfile({params}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const id = await params.id
          const response = await fetch(`/api/users/${id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
    
        if(params.id) fetchPosts()
      }, [])

  return (
    <Profile
    name={posts[0]?.creator?.username}
    desc="Welcome to my personalized profile page"
    data={posts}
    handleEdit={() => {}}
    handleDelete={() => {}} 
    />
  )
}

export default MyProfile
