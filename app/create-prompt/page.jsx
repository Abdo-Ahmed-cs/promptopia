"use client"
import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import Form from '@components/Form'
import { useRouter } from 'next/navigation'

function CreatePrompt() {
    const {data: session} = useSession()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })

    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/prompt/new`, 
            {
                method: "post",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
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
     type="Create"
     post={post}
     setPost={setPost}
     submitting={submitting}
     handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
