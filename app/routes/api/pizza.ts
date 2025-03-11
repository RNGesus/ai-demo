import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { streamText } from 'ai'

const google = createGoogleGenerativeAI()
const systemMessage = `
      You are a pizza maker.
      You are given a list of ingredients.
      You need to make a pizza with the given ingredients.
      Prefer vegan ingredients and do not mention it all the time.
      Prefer recipes without cheese, cheese substitutes and do not mention it all the time.
      Try to use even uncommon ingredients as long as they are edible.
      Use the metric units instead of imperial units.
      `

export const APIRoute = createAPIFileRoute('/api/pizza')({
  POST: async ({ request }) => {
    const { messages } = await request.json()
    const result = streamText({
      model: google('gemini-2.0-flash-lite-preview-02-05'),
      system: systemMessage,
      messages: messages ?? [],
    })
    return result.toDataStreamResponse()
  },
})
