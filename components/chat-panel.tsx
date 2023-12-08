import { type UseChatHelpers } from 'ai/react'

import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { FooterText } from '@/components/footer'
import { PromptForm } from '@/components/prompt-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { IconRefresh, IconStop } from '@/components/ui/icons'
import Message from '@/models/message'
import { useState } from 'react'
export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '', alt: '' },
  });

  const onSuccess = location => {

    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        alt: location.coords.altitude,
      },
    });
  };

  const onError = error => {
    setLocation({
      loaded: true,
      error,
    });
  };

  const [locationAccess, setLocationAccess] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <Dialog
        open={!locationAccess}
        >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>This app needs to prefetch location</DialogTitle>
            <DialogDescription>
                Allow this app to access your location in the top left corner of your browser.
                <br/>
                <Button
                  className="mx-auto my-5"
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
                    setLocationAccess(true);
                  }}>I have enabled Location Services</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              navigator.geolocation.getCurrentPosition(onSuccess, onError);
              const message: Message = {
                id: '1',
                content: value,
                geolocation: location,
                role: 'user'
              }
              await append(message)
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
