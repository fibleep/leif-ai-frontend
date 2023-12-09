import { UseChatHelpers } from 'ai/react';
import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@/components/ui/icons';
import { useEffect, useState } from 'react';
import MapView from '@/components/map';

const exampleMessages = [
  {
    heading: 'Where is the toilet?',
    message: `Where is the toilet?`
  },
  {
    heading: 'What are some interesting things near me?',
    message: 'What are some interesting things near me?'
  },
  {
    heading: 'Who are you?',
    message: `Who are you?`
  }
];

type Location = {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
}

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
         Welcome to Leif AI
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is a chatbot utilising GPT-Vision and Geolocation to help you find different places near you.
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
          <p className="text-sm text-muted-foreground">
            <MapView/>
          </p>
        </div>
      </div>
    </div>
  )
}
