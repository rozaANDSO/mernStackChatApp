import { useEffect, useState } from "react";
import useGetConversation from "./useGetConversation";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage, selectedConversation] = useGetConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000//api/message?conversationId=${selectedConversation._id}`
        );
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessage(data);
      } catch (e) {
        console.error(e);
        setLoading(false);
        alert("Failed to fetch messages");
      }
    };
    getMessage();
  },[]);
  return { loading, message };
};

export default useGetMessage;
