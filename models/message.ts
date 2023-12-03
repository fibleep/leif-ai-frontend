import { type Message as AiMessage } from "ai";

interface Message extends AiMessage {
  geolocation?: {
    loaded: boolean;
    coordinates: {
      lat: string;
      lng: string;
      alt: string;
    };
  };
}

export default Message;