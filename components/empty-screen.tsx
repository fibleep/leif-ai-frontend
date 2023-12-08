import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { useEffect, useState } from 'react'

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
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
   const [location, setLocation] = useState({ 
    latitude: null, 
    longitude: null, 
    altitude: null 
  });
  const [error, setError] = useState('');

  useEffect(() => {
    let watchId;

    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  
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
            Latitude: {location.latitude} <br/>
            Longitude: {location.longitude} <br/>
            {location.altitude !== null ? `Altitude: ${location.altitude} meters` : ''}

          </p>
        </div>
      </div>
    </div>
  )
}
