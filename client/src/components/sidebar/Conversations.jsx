import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversation();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && <div>Loading...</div>}
      {/* Make sure conversation is an array before mapping */}
      {!loading && Array.isArray(conversation) && conversation.length > 0 ? (
        conversation.map((c) => (
          <Conversation key={c._id} conversation={c} />
        ))
      ) : (
        <div>No conversations available</div>
      )}
    </div>
  );
};

export default Conversations;
