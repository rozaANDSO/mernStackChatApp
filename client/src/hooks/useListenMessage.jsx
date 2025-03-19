import React, { useEffect, useState } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversion from '../zustand/useConversion'
import notification from "../assets/sound/roza.mp3"
const useListenMessage = () => {
  const { socket } = useSocketContext()
  const { messages, setMessage } = useConversion()
  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true

      const sound=new Audio(notification)
      sound.play()
      setMessage([...messages, newMessage])
    })
    return () => socket?.off('newMessage')
  }, [socket, setMessage, messages])
}
export default useListenMessage
