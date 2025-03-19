import { useState } from "react";
import useConversion from "../zustand/useConversion";

const useSendMessage = (msg) => {  // Renamed function parameter
  const [loading, setLoading] = useState(false);
  const [, , selectedConversation] = useConversion(); // Skipped 'message' and 'setMessage'

  const sendMessage = async () => {
    if (!msg.trim()) return; // Prevent sending empty messages
    if (!selectedConversation?._id) return console.error("No conversation selected");

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/message/send/${selectedConversation._id}`, // Fixed extra '/'
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: msg,  // Using function parameter
            conversationId: selectedConversation._id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
