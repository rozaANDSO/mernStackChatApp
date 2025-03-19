import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversion from "../../zustand/useConversion";
const Message = () => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversion();
  const fromMe = Message.sendId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : "selectedConversation.profilePic";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-red-500";

  return (
    <>
      <div className={`chat${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={profilePic}
              alt="User"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500`}>Hello there!</div>
        <div className="chat-footer opacity-50 text-xs flew gap-1 items-center">
          12:34 PM
        </div>
      </div>
    </>
  );
};

export default Message;
