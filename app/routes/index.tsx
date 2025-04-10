import { useChat } from '@ai-sdk/react'
import { createFileRoute } from '@tanstack/react-router'
import { useLayoutEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

function RouteComponent() {
  const formRef = useRef<HTMLFormElement>(null)

  const { messages, handleSubmit, handleInputChange, status } = useChat({
    api: '/api/pizza',
    onFinish: () => formRef.current?.reset(),
  })

  const chatRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="p-2 grid grid-rows-[auto_1fr_auto] gap-4 h-screen lg:container mx-auto">
      <header className="text-center">
        <h1 className="text-2xl font-bold">Welcome, let us make a pizza! 🍕</h1>
      </header>

      <main
        className="overflow-y-auto grid justify-stretch items-start gap-4 scroll-smooth min-h-[min(60vh,100%)]"
        ref={chatRef}
      >
        {messages.map((message, index) => (
          <div key={message.id} className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header">
              {message.role === 'user' ? 'You' : 'AI Chef'}
              {message.createdAt
                && (
                  <time
                    className="text-xs opacity-50"
                    dateTime={message.createdAt.toISOString()}
                  >
                    {formatTime(message.createdAt)}
                  </time>
                )}
            </div>
            <div className="chat-bubble max-w-[min(80%,800px)]">
              <pre className="whitespace-pre-wrap">{message.content}</pre>
            </div>
            {index === messages.length - 1
              && message.role === 'assistant'
              && status === 'streaming'
              && (<div className="chat-footer opacity-50">Preparing recipe...</div>)}
          </div>
        ))}
      </main>
      <form
        ref={formRef}
        className="flex items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <textarea
          rows={2}
          cols={200}
          className="textarea textarea-md textarea-primary"
          placeholder="Enter some ingredients..."
          name="message"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              status === 'ready' && handleSubmit(e)
            }
          }}
        />
        <button className="btn btn-primary" type="submit">Prepare pizza</button>
      </form>
    </div>
  )
}
