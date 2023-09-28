"use client"
import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <PromptCard
         key={post._id} 
         post={post}
         handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

function Feed() {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const handleSearchChange = (e) => {
    setSearchText(() => e.target.value)
    const usernameFilter = posts.filter(post => post.creator.username.includes(e.target.value))
    const tagFilter = posts.filter(post => post.tag.includes(e.target.value))

    if (e.target.value === "") {
      setFilteredPosts(() => posts)
    } else if (!!usernameFilter.length) {
      setFilteredPosts((prev) => usernameFilter)
    } else if (!!tagFilter.length) {
      setFilteredPosts((prev) => tagFilter)
    } else {
      setFilteredPosts(() => [])
    }
  }

  const handleTagClick = (tag) => {
    setSearchText(() => tag)
    const tagFilter = posts.filter(post => post.tag.includes(tag))
    setFilteredPosts((prev) => tagFilter)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()
  
      setPosts(data)
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    setFilteredPosts(() => posts)
  }, [posts])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type="text"
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input' 
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed