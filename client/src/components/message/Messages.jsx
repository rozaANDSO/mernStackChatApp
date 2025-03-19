import React, { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkellton from "../sekelton/MessageSkellton";
import useListenMessage from "../../hooks/useListenMessage";
const Messages = () => {
  const { message, loading } = useGetMessage();
  useListenMessage()
  const lastMessage = useRef()
  useEffect(()=>{
    if(lastMessage.current){
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    }
    lastMessage.current = document.querySelector('.message-container') || null;
    // eslint-disable-next-line react-hooks/exhaustive-deps

  },[])

  return (
    <>
      <div className=" px-4 flex-1 overflow-auto">
        <div className="message-container" ref={lastMessage}>
          {message && message.map((msg) => (
            <div key={msg._id} className={`message ${msg.sender === "me" ? "self" : ""}`}>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>
        {loading &&
          [...Array(3)].map((_, idx) => <MessageSkellton key={idx} />)}
        {!loading && message && <MessageSkellton message={message} />}
      </div>
    </>
  );
};

export default Messages;
