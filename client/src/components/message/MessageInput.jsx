import React, { useState } from "react";
import { LuSend } from "react-icons/lu";
import useSendMessage from "../../hooks/useSendMessage";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="px-4 my-3">
        <div className="w-full relative">
          <input
            className=" w-full p-2.5 text-sm text-gray-700
             bg-white border border-gray-300 rounded-md 
             shadow-sm focus:outline-none focus:ring-blue-500
              focus:border-blue-500"
            type="text"
            placeholder="Type a message..."
          />
          <button
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            type="submit"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
            ) : (
              <LuSend className="h-8 w-8 text-blue-900" />
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
