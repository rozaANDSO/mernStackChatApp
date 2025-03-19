import { createContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import io from 'socket.io-client'
export const SocketContext = createContext()
export const useSocketContext = () => {
  return useContext(SocketContext) // Use context inside a hook
}
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUser, setOnlineUser] = useState([])
  const [users, setUsers] = useState([])
  const { authUser } = useAuthContext()
  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:5000', {
        query: { userId: authUser._id },
      })
      setSocket(socket)
      socket.on('onlineUsers', (users) => {
        setUsers(users)
      })
      socket.on('userStatusChange', (userStatus) => {
        if (userStatus.status === 'online') {
          setOnlineUser((prevOnlineUsers) => [
            ...prevOnlineUsers,
            userStatus.user,
          ])
        } else {
          setOnlineUser((prevOnlineUsers) =>
            prevOnlineUsers.filter((u) => u._id !== userStatus.user._id),
          )
        }
      })

      socket.on('newMessage', (message) => {
        console.log(message)
      })

      socket.on('disconnect', () => {
        console.log('Disconnected')
      })

      // Clean up the socket connection on unmount
      return () => {
        socket.disconnect()
        setSocket(null)
      }
    }
  }, [authUser]) // Add authUser as a dependency

  return (
    <SocketContext.Provider value={{ socket, onlineUser, users }}>
      {children}
    </SocketContext.Provider>
  )
}
