import { create } from "zustand";
const useConversion = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set(() => ({ selectedConversation: conversation })),
  deselectConversation: () => set(() => ({ selectedConversation: null })),
  message: [],
  addMessage: (message) =>
    set((state) => ({ message: [...state.message, message] })),
  clearMessages: () => set(() => ({ message: [] })),
}));

export default useConversion;
