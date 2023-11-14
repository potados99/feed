import { eventbus } from "./eventbus";

export const feedEventChannel = eventbus<{
  onInvalidate: () => void;
}>();
