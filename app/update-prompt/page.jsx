"use client"
import React, {useEffect, useState} from 'react'
import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation'

function EditPrompt() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) getPromptDetails()
    }, [promptId])

    const UpdatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/prompt/${promptId}`, 
            {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Form
     type="Edit"
     post={post}
     setPost={setPost}
     submitting={submitting}
     handleSubmit={UpdatePrompt}
    />
  )
}

export default EditPrompt
