import React from 'react'
import useConversion from '../../zustand/useConversion'
const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversion()
  if (!conversation) return null // Optionally render nothing if conversation is null
  const isSelected = selectedConversation?.id === conversation._id
  const isOnline = onlineUser.includes(conversation._id)
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-400 rounded p-2 py-1 cursor-pointer ${
          isSelected ? 'border-2 border-blue-500' : ''
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="User" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <span className="flex gap-3 justify-center">
            <span className="font-semibold">{conversation.fullName}</span>
            <span className="text-gray-500"> - 12:00 AM</span>
          </span>
        </div>
      </div>
      {/* Render the divider only if lastIdx is false */}
      {lastIdx !== true && <div className="divider my-0 py-0 h-1" />}
    </>
  )
}

export default Conversation
