import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createServerFileRoute } from '@tanstack/react-start/server'
import { streamText } from 'ai'

const google = createGoogleGenerativeAI()
const systemMessage = `
      You are a pizza baker.
      You are given a list of ingredients.
      You need to make a pizza with the given ingredients.
      Prefer vegan ingredients and do not mention it all the time.
      Prefer recipes without cheese, cheese substitutes and do not mention it all the time.
      Try to use even uncommon ingredients as long as they are edible.
      Use the metric units instead of imperial units.
      `

export const ServerRoute = createServerFileRoute('/api/pizza').methods({
  POST: async ({ request }) => {
    const { messages } = await request.json()
    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: systemMessage,
      messages: messages ?? [],
    })
    return result.toDataStreamResponse()
  },
})
