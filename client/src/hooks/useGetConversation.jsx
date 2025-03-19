import { useEffect, useState } from 'react'

const useGetConversation = () => {
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState(null)

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('chat-token')
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetch('http://localhost:5000/api/user', {
          headers: {
            method: "GET",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        setConversation(data)
      } catch (error) {
        console.error('Fetch error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    getConversation()
  }, [])

  return { loading, conversation }
}

export default useGetConversation
