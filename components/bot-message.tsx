// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx


import { IconOpenAI } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import BotResponse from '@/models/bot_response'
import type Message from '@/models/message'

export interface ChatMessageProps {
  message: Message
}

export function BotMessage({ message, ...props }: ChatMessageProps) {
    const botMessage = JSON.parse(message.content)
    
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-primary text-primary-foreground'
        }
      >
        <IconOpenAI />
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
          {botMessage}
        {/* <ChatMessageActions message={message.ai_comment} /> */}
      </div>
    </div>
  )
}
