import type Message from '@/models/message'

import { ChatMessage } from '@/components/chat-message'
import { Separator } from '@/components/ui/separator'
import { BotMessage } from '@/components/bot-message'

export interface ChatList {
  messages: Message[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          {message.role === 'assistant' ? (
          <BotMessage message={message} />  
          ) : (
          <ChatMessage message={message} />
          )}
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}
