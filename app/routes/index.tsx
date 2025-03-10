import { useChat } from '@ai-sdk/react'
import { createFileRoute } from '@tanstack/react-router'
import { useLayoutEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { messages, append } = useChat({
    api: '/api/pizza',
  })

  const chatRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="p-2 grid grid-rows-[auto_1fr_auto] gap-4 h-screen container mx-auto">
      <header className="text-center">
        <h1 className="text-2xl font-bold">Welcome, let us make some Pizza! 🍕</h1>
      </header>

      <main
        className="overflow-y-auto grid place-content-start gap-4 scroll-smooth min-h-[min(60vh,100%)]"
        ref={chatRef}
      >
        {messages.map(message => (
          <div key={message.id} className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header">
              {message.role === 'user' ? 'You' : 'AI'}
              {message.createdAt
                && (
                  <time
                    className="text-xs opacity-50"
                    dateTime={message.createdAt.toISOString()}
                  >
                    {message.createdAt.toLocaleString('de-DE', { timeZone: 'Europe/Berlin', dateStyle: 'short', timeStyle: 'short' })}
                  </time>
                )}
            </div>
            <div className="chat-bubble max-w-[min(80%,800px)]">
              <pre className="whitespace-pre-wrap">{message.content}</pre>
            </div>
          </div>
        ))}
      </main>
      <form
        className="flex place-content-center place-items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          const messageTextarea = form.elements.namedItem('message') as HTMLTextAreaElement
          append({ content: messageTextarea.value, role: 'user' })
          form.reset()
        }}
      >
        {/* TODO: handle 'enter' and 'ctrl+enter' */}
        <textarea
          rows={2}
          cols={500}
          className="textarea textarea-md"
          placeholder="Enter some ingredients..."
          name="message"
        />
        <button className="btn btn-primary" type="submit">Prepare pizza</button>
      </form>
    </div>
  )
}
