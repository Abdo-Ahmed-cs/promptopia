import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export async function GET(req, {params}) {
    try {
        await connectToDB()

        const prompts = await Prompt.findById(params.id).populate("creator")

        if (!prompts) {
            return new Response("prompt not found", {status: 404})
        }

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch Prompts", {status: 500})
    }
}

export async function PATCH(req, {params}) {
    const {prompt, tag} = await req.json()
    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id).populate("creator")

        if (!existingPrompt) {
            return new Response("prompt not found", {status: 404})
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()
        
        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response("Failed to update Prompts", {status: 500})
    }
}


export async function DELETE(req, {params}) {
    try {
        await connectToDB()

        await Prompt.findByIdAndRemove(params.id).populate("creator")

        return new Response(JSON.stringify("prompts deleted successfully"), {status: 200})
    } catch (error) {
        return new Response("Failed to delete Prompts", {status: 500})
    }
}